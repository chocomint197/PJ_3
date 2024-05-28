import mongoose from "mongoose";
import Collections from "../../database/collection.js";

const groupSchema = new mongoose.Schema({
    groupLeader: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Collections.USERS,
        required: true
    },
    groupMembers: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: Collections.USERS
    }],
    uploadedItems: [{
        item: {
            type: mongoose.SchemaType.ObjectId,
            required: true,
            refPath: 'uploadedItems.itemType'
        },
        itemType: {
            type: String,
            required: true,
            enum: [Collections.MANGAS, Collections.CHAPTERS]
        }
    }]
})

const GroupModel = mongoose.model(Collections.GROUP, groupSchema);
export default GroupModel