import mongoose from "mongoose";
import Collections from "../../database/collection.js";

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    mangas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Collections.MANGAS
    }]

})

const AuthorModel = mongoose.model(Collections.AUTHOR, authorSchema);
export default AuthorModel