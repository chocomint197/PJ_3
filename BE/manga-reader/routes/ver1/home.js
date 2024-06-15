import { Router } from "express";
import mangaController from "../../controllers/mangas/index.js";


const HomeRouter = Router();

HomeRouter.get('/', mangaController.getAllMangas);
HomeRouter.get('/titles/search', mangaController.searchManga)

export default HomeRouter;