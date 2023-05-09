import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Item, Vendor } from './config/models.js';
import verifyToken from './middleware.js';

import db from './config/database.js';
db();

const api = express();

api.use(express.json());

const apiEndpoints = {
    public: {
        items: '/public/items',
        vendors: '/public/vendors',
    },
    private: {
        items: '/private/items',
        vendors: '/private/vendors',
        admin: {
            register: '/private/admin/new',
            superuser: '/private/admin/superuser',
            login: '/private/admin/login',
        },
    }
};

async function refresh() {
    let responseArray = [];
    let as = await Item.find({});
    let bs = await Vendor.find({});
    for (const a of as) {
        await a.populate('vendor_id');
        responseArray.push({ item: a });
        for (const b of bs) {
            if (a.vendor_id == b._id) {
                itemsArray = b.menu_items;
                b.menu_items = [...itemsArray, a];
            }
            await b.populate('menu_items');
            responseArray.push({ vendor: b });
        }
    }

    return responseArray;
}

api.get(apiEndpoints.public.items, async (req, res) => {
    let responseBody;
    let stat = 200;

    try {
        switch (req.headers['z-request-type']) {
            case 'all':
                responseBody = await Item.find({}).lean();
                break;
            case 'by_vendor':
                responseBody = await Item.find({
                    vendor_id: req.headers['z-vendor-id'],
                }).lean();
                break;
            case 'by_id':
                responseBody = await Item.findById(
                    req.headers['z-item-id']
                ).lean();
                break;
            default:
                responseBody = await Item.find({}).lean();
                break;
        }
    } catch (e) {
        responseBody = { error: e.toString() };
        stat = 400;
    } finally {
        res.status(stat).json(responseBody);
    }
});
api.post(apiEndpoints.private.items, verifyToken, async (req, res) => {
    let responseBody;

    try {
        let i = new Item({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            type: req.body.type,
            vendor_id: req.user.user_id,
            test_object: req.body.test,
        });

        await i.save();

        let v = await Vendor.findById(req.user.user_id);
        v.menu_items.push(i);

        await v.save();

        refresh();

        responseBody = i;
    } catch (e) {
        responseBody = { error: e };
    } finally {
        res.json(responseBody);
    }
});
api.put(apiEndpoints.private.items, verifyToken, async (req, res) => {
    let responseBody;

    try {
        if (req.headers['z-request-type'] == 'refresh') {
            responseBody = await refresh();
        } else {
            responseBody = await Item.findByIdAndUpdate(
                req.body.id,
                req.body.query
            );
        }
    } catch (e) {
        responseBody = { error: e.toString() };
    } finally {
        res.json(responseBody);
    }
});
api.delete(apiEndpoints.private.items, verifyToken, async (req, res) => {
    let responseBody;
    let responseArray = [];

    try {
        if (req.headers['z-request-type'] == 'clear') {
            let is = await Item.find({}, 'id').lean();
            for (const i of is) {
                let r = await Item.findByIdAndDelete(i._id);
                responseArray.push(r);
            }
            responseBody = responseArray;
        } else {
            let i = await Item.findById(req.body.id);
            let v = await Vendor.findById(i.vendor_id);
            const idx = v.menu_items.indexOf(i._id, 0);
            if (idx > -1) v.menu_items.splice(idx, 1);
            v.save();
            responseBody = await Item.findByIdAndDelete(req.body.id);
        }
    } catch (e) {
        responseBody = { error: e.toString() };
    } finally {
        res.json(responseBody);
    }
});

api.get(apiEndpoints.public.vendors, async (req, res) => {
    let responseBody;
    let stat = 200;

    try {
        responseBody = await Vendor.findById(req.headers['z-vendor-id']).lean();
    } catch (e) {
        responseBody = { error: e };
        stat = 400;
        throw e;
    } finally {
        res.status(stat).json(responseBody);
    }
});
api.get(apiEndpoints.private.vendors, verifyToken, async (req, res) => {
    let responseBody;
    let stat = 200;

    try {
        responseBody = await Vendor.findById(req.user.user_id).lean();
    } catch (e) {
        responseBody = { error: e };
        stat = 400;
        throw e;
    } finally {
        res.status(stat).json(responseBody);
    }
});
api.put(apiEndpoints.private.vendors, verifyToken, async (req, res) => {
    let responseBody;

    try {
        responseBody = await Vendor.findByIdAndUpdate(
            req.user.user_id,
            req.body.query
        );
    } catch (e) {
        responseBody = { error: e };
    } finally {
        res.json(responseBody);
    }
});
api.delete(apiEndpoints.private.vendors, verifyToken, async (req, res) => {
    let responseBody;

    try {
        switch (req.headers['z-request-type']) {
            case 'vendor':
                responseBody = await Vendor.findByIdAndDelete(req.body.id);
                break;
            case 'menuitems':
                let v = await Vendor.findById(req.user.user_id);
                v.menu_items = [];
                responseBody = v.save();
            default:
                break;
        }
    } catch (e) {
        responseBody = { error: e.toString() };
    } finally {
        res.json(responseBody);
    }
});

api.post(apiEndpoints.private.admin.register, async (req, res) => {
    let responseBody;
    let stat = 200;

    try {
        let { name, location, password } = req.body;

        if (!name) {
            throw 'Name cannot be empty';
        } else if (!location) {
            throw 'Location cannot be empty';
        } else if (!password) {
            throw 'Password cannot be empty';
        }

        if (await Vendor.findOne({ location })) {
            throw 'Vendor already exists in this location';
        }

        let encryptedPassword = await bcrypt.hash(password, 10);

        let v = new Vendor({
            name: name,
            location: location.toUpperCase(),
            password: encryptedPassword,
            test_object: req.body.test,
        });

        await v.save();

        const token = jwt.sign(
            { user_id: v._id, location },
            process.env.USERAUTHTOKENKEY,
            {
                expiresIn: JWT_EXPIRATIONPERIOD,
            }
        );

        v.token = token;
        await v.save();

        responseBody = v;
        stat = 201;
    } catch (err) {
        responseBody = { error: err.toString() };
        stat = 400;
    } finally {
        res.status(stat).json(responseBody);
    }
});
api.post(apiEndpoints.private.admin.superuser, async (req, res) => {
    let responseBody;
    let stat = 200;

    try {
        let { name, password, auth } = req.body;

        if (!name) {
            throw 'Name cannot be empty';
        } else if (!password) {
            throw 'Password cannot be empty';
        }

        if (await User.findOne({ name })) {
            throw 'User already exists';
        }

        if (!(auth == process.env.USERAUTHTOKENKEY)) {
            throw 'Wrong authkey';
        }

        let encryptedPassword = await bcrypt.hash(password, 10);

        let v = new Vendor({
            name: name,
            location: location.toUpperCase(),
            password: encryptedPassword,
            test_object: req.body.test,
        });

        await v.save();

        const token = jwt.sign(
            { user_id: v._id, location },
            process.env.USERAUTHTOKENKEY,
            {
                expiresIn: JWT_EXPIRATIONPERIOD,
            }
        );

        v.token = token;
        await v.save();

        responseBody = v;
        stat = 201;
    } catch (err) {
        responseBody = { error: err.toString() };
        stat = 400;
    } finally {
        res.status(stat).json(responseBody);
    }
});
api.post(apiEndpoints.private.admin.login, async (req, res) => {
    let responseBody;
    let stat = 200;

    try {
        let { location, password } = req.body;

        location = location.toUpperCase();

        if (!location) {
            throw 'Location is needed to login';
        } else if (!password) {
            throw 'Password cannot be empty';
        }

        const v = await Vendor.findOne({ location });

        if (!v) {
            throw 'Login not found. Please register';
        }

        if (await bcrypt.compare(password, v.password)) {
            const token = jwt.sign(
                { user_id: v._id, location },
                process.env.USERAUTHTOKENKEY,
                {
                    expiresIn: process.env.JWT_EXPIRATIONPERIOD,
                }
            );

            v.token = token;
            responseBody = await v.save();
            stat = 200;
        } else {
            throw 'Wrong password! Please try again';
        }
    } catch (e) {
        responseBody = { error: e.toString() };
        stat = 400;
    } finally {
        res.status(stat).json(responseBody);
    }
});

export default api;
