import mongoose from "mongoose";
import Collections from "../../database/collection.js";

const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    groupLeader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Collections.USERS,
        required: true
    },
    groupMembers: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: Collections.USERS
    }],
    groupDescription: {
        type: String
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
    uploadedItemCount: {
        type: Number,
        default: 0
    }
})
groupSchema.pre('save', function(next) {
    this.uploadedItemCount = this.uploadedItems.length;
    next();
});


const GroupModel = mongoose.model(Collections.GROUP, groupSchema);
export default GroupModel