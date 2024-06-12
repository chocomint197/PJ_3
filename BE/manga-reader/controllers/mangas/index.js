import MangaModel from "../../models/mangas/mangas.js";
import AuthorModel from "../../models/author/author.js";
import ArtistModel from "../../models/artirst/artist.js";
import UserModel from "../../models/users/users.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import tagsEnum from "../../models/mangas/tagsEnum.js";
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
      const { title, author, artist, format, genre, theme,contentRating, status, publicDate } = req.body;
      const formatArr = JSON.parse(format)
      const genreArr = JSON.parse(genre)
      const themeArr = JSON.parse(theme)

      const uploaderId = req.user.userId;
      let uploadedImageUrl = null;
      console.log(req.files)
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
        console.log("Uploaded Image URL:", uploadedImageUrl);
      }
      console.log(req.files)
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
        author: findAuthor._id,
        artist: findArtist._id,
        format: formatArr,
        genre: genreArr,
        theme: themeArr,
        status: status,
        contentRating: contentRating,
        publicDate: publicDate,
        images: [uploadedImageUrl],
        uploader: uploaderId,

      });
   
      await newManga.save();
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
      const manga = await MangaModel.findById(id);
      if (!manga) throw new Error("Manga not exists");
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
      const mangas = await MangaModel.find();
      res.status(200).json({
        data: mangas,
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
  mangaTags: async(req,res) => {
    try {
        res.status(200).json({
            tagsEnum
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
  }
};

export default mangaController;
