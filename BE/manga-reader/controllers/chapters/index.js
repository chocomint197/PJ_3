import Collections from "../../database/collection.js";
import MangaModel from "../../models/mangas/mangas.js";
import UserModel from "../../models/users/users.js";
import ChapterModel from "../../models/chapters/chapters.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: "dgcsigpq8",
  api_key: "138189825145128",
  api_secret: "zswXiGs54_YJr97M0vnslJi-49I",
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const chapterController = {
  createChapter: async (req, res) => {
    try {
      const { title, chapterNumber } = req.body;
      const { mangaId } = req.params;
      const uploader = req.user.userId;

      const manga = await MangaModel.findById(mangaId);
      if (!manga) throw new Error("Manga not found");

      const checkChapter = await ChapterModel.findOne({
        manga: mangaId,
        chapterNumber: chapterNumber,
      });
      if (checkChapter)
        throw new Error("Chapter number already exists for this manga");

      const pages = req.files;
      if (!pages || pages.length === 0) throw new Error("No files uploaded");

      const pageUrls = await Promise.all(
        pages.map((file) => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "manga_chapters" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
              }
            );
            stream.end(file.buffer);
          });
        })
      );

      const newChapter = new ChapterModel({
        title,
        chapterNumber,
        pages: pageUrls,
        uploader: uploader,
        manga: mangaId,
      });
      const savedChapter = await newChapter.save();
      await MangaModel.findByIdAndUpdate(
        mangaId,
        { $push: { chapters: savedChapter._id } },
        { new: true, useFindAndModify: false }
      );

      await UserModel.findByIdAndUpdate(
        uploader,
        {
          $push: {
            uploadedItems: {
              item: savedChapter._id,
              itemType: Collections.CHAPTERS,
            },
          },
        },
        { new: true, useFindAndModify: false }
      );

      res.status(201).send({
        newChapter,
        message: "Chapter upload success",
        success: true,
      });
    } catch (error) {
      res.status(500).send({
        data: null,
        message: error.message,
        error,
        success: false,
      });
    }
  },
  chapterInfo: async (req, res) => {
    try {
      const { mangaId, chapterId } = req.params;
      const chapter = await ChapterModel.findOne({
        _id: chapterId,
        manga: mangaId,
      })
        .populate({
            path: "uploader",
            select: "_id userName"
        })
        .populate({
            path: "manga",
            select: "_id title chapters"
        })
        .lean()
        .exec();
      if (!chapter) {
        return res.status(404).send({
          success: false,
          message: "Chapter not found",
        });
      }
      res.status(200).send({
        success: true,
        chapter,
      });
    } catch (error) {
      res.status(500).send({
        data: null,
        message: error.message,
        error,
        success: false,
      });
    }
  },
};

export default chapterController;
