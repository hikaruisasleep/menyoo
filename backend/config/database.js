import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default () => {
    mongoose
        .connect(
            `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URI}/?retryWrites=true&w=majority`
        )
        .then(() => {
            console.log('Successfully connected to database');
        })
        .catch((error) => {
            console.log('database connection failed. exiting now...');
            console.error(error);
            process.exit(1);
        });
};
