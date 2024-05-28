import MangaModel from "../../models/mangas/mangas.js";
import AuthorModel from "../../models/author/author.js";
import ArtistModel from "../../models/artirst/artist.js";
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({
    cloud_name: 'dgcsigpq8',
    api_key: '138189825145128',
    api_secret: 'zswXiGs54_YJr97M0vnslJi-49I'
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const mangaController = {
    createManga: async(req,res) => {
        try {
            const { title, author, artist, format, genre, theme, image} = req.body;
            const uploaderId = req.user.userId
            // const images = req.files.map(file => file.path);
            // const uploadedImages = [];
            // for (const image of images) {
            //     const result = await cloudinary.uploader.upload(image);
            //     uploadedImages.push(result.secure_url);
            // }

            const lowerCaseAuthor = author.toLowerCase();
            const lowerCaseArtist = artist.toLowerCase();
            let findAuthor = await AuthorModel.findOne({name: lowerCaseAuthor})
            if (!findAuthor) {
                findAuthor = await AuthorModel.create({name: lowerCaseAuthor})
            }
            let findArtist = await ArtistModel.findOne({name: lowerCaseArtist})
            if (!findArtist) {
                findArtist = await ArtistModel.create({name: lowerCaseArtist})
            }
            const newManga = new MangaModel({
                title,
                author: findAuthor._id,
                artist: findArtist._id,
                format,
                genre,
                theme,
                // images : uploadedImages,
                image,
                uploader: uploaderId
            })
            await newManga.save();
            findAuthor.mangas.push(newManga._id);
            findArtist.mangas.push(newManga._id);
            await findAuthor.save();
            await findArtist.save();

            res.status(201).send({
                data: newManga,
                message: 'Manga upload success',
                success: true
        })

        } catch (error) {
            res.status(500).send({
                data: null,
                message: error.message,
                error,
                success: false
                 });

        }
    },
    mangaInfo: async(req,res) => {
        try {
            const { id } = req.params;
            const manga = await MangaModel.findById(id);
           if(!manga) throw new Error('Manga not exists')
            res.status(201).send({
                data: manga,
                message: 'Get manga info success',
                success:true
        })
        } 
        catch (error) {
            res.status(404).send({
                data: null,
                message: error.message,
                error,
                success: false
                 });

        }
    },
    getAllMangas: async(req,res) => {
        try {
            const mangas = await MangaModel.find();
            res.status(200).json({
                data: mangas,
                message:'List mangas',
                success: true
            })
        } catch (error) {
            res.status(500).json({
                data: null,
                message: 'Error',
                success: false,
                error: error.message
            });
        }
    }

}

export default mangaController