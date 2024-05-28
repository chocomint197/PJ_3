import mongoose from "mongoose";
import Collections from "../../database/collection.js";
import tagsEnum from "./tagsEnum.js";



const mangaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Collections.AUTHOR,
        required: true
    },
    artist: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Collections.ARTIST,
        required: true
    },
    format: {
        type: [String],
        enum: tagsEnum.format,
        required: true,
    },
    genre: {
        type: [String],
        enum: tagsEnum.genre,
        required: true,
    },
    theme: {
        type: [String],
        enum: tagsEnum.theme,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    uploader: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Collections.USERS,
        required: true,
    }
}, {
    timestamps: true
});

const MangaModel = mongoose.model(Collections.MANGAS, mangaSchema);
export default MangaModel;