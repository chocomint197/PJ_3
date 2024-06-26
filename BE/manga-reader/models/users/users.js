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
   group: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: Collections.GROUP,
    default: null
   }],
   role: {
    type: [String],
    default: ['Member']
   },
   uploadedItems: [{
    item: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'uploadedItems.itemType'                           
    },
    itemType: {
        type: String,
        required: true,
        enum: [Collections.MANGAS, Collections.CHAPTERS]
    }
}],
}, {
    timestamps: true
});
userSchema.methods.updateRoles = async function() {
    const roles = ['Member']; 

    if (this.group) {
        const group = await mongoose.model(Collections.GROUP).findById(this.group);
        if (group) {
            if (group.groupLeader.equals(this._id)) {
                roles.push('Group leader');
            } else {
                roles.push('Group member');
            }
        }
    }

   
};
const UserModel = mongoose.model(Collections.USERS, userSchema);
export default UserModel;