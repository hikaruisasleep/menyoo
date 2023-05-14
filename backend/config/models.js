import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    test_object: { type: Boolean, default: true },
    name: String,
    description: { type: String, default: '' },
    price: Number,
    type: Boolean,
    vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
});

const Item = mongoose.model('Item', ItemSchema);

const VendorSchema = new mongoose.Schema({
    test_object: { type: Boolean, default: true },
    name: String,
    location: { type: String, unique: true },
    password: String,
    type: Boolean,
    description: String,
    tags: [{type: mongoose.Schema.Types.String}],
    token: String,
    menu_items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
});

const Vendor = mongoose.model('Vendor', VendorSchema);

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    token: String,
});

const User = mongoose.model('User', UserSchema);

export { Item, Vendor, User };
