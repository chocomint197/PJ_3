import mongoose from "mongoose";
import Collections from "../../database/collection.js";



const chapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true,
    },
    uploader:{
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: Collections.USERS
    
}, 
    timestamps: true
});

const ChapterModel = mongoose.model(Collections.CHAPTERS, chapterSchema);
export default ChapterModel;