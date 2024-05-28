import { Router } from "express";
import middlewares from "../../middlewares/index.js";
import mangaController from "../../controllers/mangas/index.js";


const MangaRouter = Router();

MangaRouter.post('/create', middlewares.verifyAccessToken, mangaController.createManga);
MangaRouter.get('/:id', mangaController.mangaInfo);

export default MangaRouter;