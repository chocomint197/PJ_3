import mongoose from "mongoose";
import Collections from "../../database/collection.js";

const chapterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    chapterNumber: {
        type: Number,
        required: true
    },
    pages: {
      type: [String],
      required: true,
    },
    uploader: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: Collections.USERS,
    },
    manga: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: Collections.MANGAS,
    },
  },
  {
    timestamps: true,
  }
);

const ChapterModel = mongoose.model(Collections.CHAPTERS, chapterSchema);
export default ChapterModel;
