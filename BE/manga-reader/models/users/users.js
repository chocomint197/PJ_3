import mongoose from 'mongoose';
import Collections from '../../database/collections.js';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: String,
    password: String,
    avatar: String,
   
}, {
    timestamps: true
});
const UserModel = mongoose.model(Collections.USERS, userSchema);
export default UserModel;