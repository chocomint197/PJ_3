import mongoose from "mongoose";
import dotenv from 'dotenv';

const connectDatabase = () => {
    const connectString = process.env.CONNECT_STRING;
    return mongoose.connect(connectString);

}
export default connectDatabase;