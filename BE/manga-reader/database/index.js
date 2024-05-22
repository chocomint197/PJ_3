import mongoose from "mongoose";

const connectDatabase = () => {
    const connectString = process.env.CONNECT_STRING;
    return mongoose.connect(connectString);

}
export default connectDatabase;