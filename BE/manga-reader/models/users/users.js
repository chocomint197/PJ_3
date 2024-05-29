import mongoose from 'mongoose';
import Collections from '../../database/collection.js';

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
   group: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: Collections.GROUP,
    default: null
   },
   role: {
    type: [String],
    default: ['member']
   }
}, {
    timestamps: true
});
userSchema.methods.updateRoles = async function() {
    const roles = ['member']; 

    if (this.group) {
        const group = await mongoose.model(Collections.GROUP).findById(this.group);
        if (group) {
            if (group.groupLeader.equals(this._id)) {
                roles.push('group leader');
            } else {
                roles.push('group member');
            }
        }
    }

    const mangaCount = await mongoose.model(Collections.MANGAS).countDocuments({ uploader: this._id });
    const chapterCount = await mongoose.model(Collections.CHAPTERS).countDocuments({ uploader: this._id });

    if (mangaCount > 0 || chapterCount > 0) {
        roles.push('uploader');
    }

    this.role = roles;
    await this.save();
};
const UserModel = mongoose.model(Collections.USERS, userSchema);
export default UserModel;