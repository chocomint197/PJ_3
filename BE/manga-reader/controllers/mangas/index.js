import MangaModel from "../../models/mangas/mangas.js";
import AuthorModel from "../../models/author/author.js";
import ArtistModel from "../../models/artirst/artist.js";
import UserModel from "../../models/users/users.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import tagsEnum from "../../models/mangas/tagsEnum.js";
import mongoose, { isValidObjectId } from "mongoose";
import Collections from "../../database/collection.js";
cloudinary.config({
  cloud_name: "dgcsigpq8",
  api_key: "138189825145128",
  api_secret: "zswXiGs54_YJr97M0vnslJi-49I",
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const mangaController = {
  createManga: async (req, res) => {
    try {
      const {
        title,
        author,
        artist,
        format,
        genre,
        theme,
        contentRating,
        status,
        publicDate,
        description,
      } = req.body;

      const formatArr = Array.isArray(format) ? format : JSON.parse(format);
      const genreArr = Array.isArray(genre) ? genre : JSON.parse(genre);
      const themeArr = Array.isArray(theme) ? theme : JSON.parse(theme);
      const uploaderId = req.user.userId;
      const findTitle = await MangaModel.findOne({ title: title });
      if (findTitle) throw new Error("Manga already existed");
      let uploadedImageUrl = null;

      if (req.file) {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload error:", error);
                reject(new Error("Cloudinary upload failed"));
              } else {
                resolve(result);
              }
            }
          );
          uploadStream.end(req.file.buffer);
        });
        uploadedImageUrl = result.secure_url;
      }
      const lowerCaseAuthor = author.toLowerCase();
      const lowerCaseArtist = artist.toLowerCase();
      let findAuthor = await AuthorModel.findOne({ name: lowerCaseAuthor });
      let findArtist = await ArtistModel.findOne({ name: lowerCaseArtist });

      if (lowerCaseAuthor === lowerCaseArtist) {
        if (!findAuthor) {
          findAuthor = await AuthorModel.create({ name: lowerCaseAuthor });
        }
        findArtist = findAuthor;
      } else {
        if (!findAuthor) {
          findAuthor = await AuthorModel.create({ name: lowerCaseAuthor });
        }
        if (!findArtist) {
          findArtist = await ArtistModel.create({ name: lowerCaseArtist });
        }
      }

      const newManga = new MangaModel({
        title,
        author: findAuthor,
        artist: findArtist,
        format: formatArr,
        genre: genreArr,
        theme: themeArr,
        status: status,
        contentRating: contentRating,
        publicDate: publicDate,
        images: [uploadedImageUrl],
        uploader: uploaderId,
        description: description,
      });

      await newManga.save();
      await UserModel.findByIdAndUpdate(
        uploaderId,
        {
          $push: {
            uploadedItems: { item: newManga._id, itemType: Collections.MANGAS },
          },
        },
        { new: true }
      );
      findAuthor.mangas.push(newManga._id);
      findArtist.mangas.push(newManga._id);
      await findAuthor.save();
      await findArtist.save();
      const user = await UserModel.findById(uploaderId);
      await user.updateRoles();
      res.status(201).send({
        data: newManga,
        message: "Manga upload success",
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
  mangaInfo: async (req, res) => {
    try {
      const { id } = req.params;
      let manga = await MangaModel.findById(id);
      if (!manga) throw new Error("Manga not exists");
      if (typeof manga.artist === "string") {
        manga = await MangaModel.findById(id)
          .populate("author")
          .populate("chapters")
          .populate("uploader")
          .lean()
          .exec();
        manga.artist = undefined;
      } else {
        manga = await MangaModel.findById(id)
          .populate('author')
          .populate('artist')
          .populate('chapters')
          .populate('uploader')
          .lean()
          .exec();
      }

      res.status(201).send({
        data: manga,
        message: "Get manga info success",
        success: true,
      });
    } catch (error) {
      res.status(404).send({
        data: null,
        message: error.message,
        error,
        success: false,
      });
    }
  },
  getAllMangas: async (req, res) => {
    try {
      const mangas = await MangaModel.find().populate("uploader").populate('chapters');
      const formattedMangas = mangas.map((manga) => ({
        ...manga.toObject(),
        uploader: {
          id: manga.uploader._id,
          userName: manga.uploader.userName,
        },
      }));
      res.status(200).json({
        data: formattedMangas,
        message: "List mangas",
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "Error",
        success: false,
        error: error.message,
      });
    }
  },
  mangaTags: async (req, res) => {
    try {
      res.status(200).json({
        tagsEnum,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  searchManga: async(req,res) => {
    try {
      const { title } = req.query;
      const regex = new RegExp(title, "i");
      const mangas = await MangaModel.find({ title: regex });
      const formattedMangas = mangas.map((manga) => ({
        ...manga.toObject(),
        uploader: {
          id: manga.uploader._id,
          userName: manga.uploader.userName,
        },
      }));
      res.status(200).json({
        formattedMangas,
        message: "Search mangas by title",
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "Error",
        success: false,
        error: error.message,
      });
    }
  },
};


export default mangaController;
