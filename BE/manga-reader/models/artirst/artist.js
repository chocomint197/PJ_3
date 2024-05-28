import mongoose from "mongoose";
import Collections from "../../database/collection.js";

const artistSchema = new mongoose.Schema({
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

const ArtistModel = mongoose.model(Collections.ARTIST, artistSchema);
export default ArtistModel