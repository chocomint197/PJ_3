import { Router } from "express";
import mangaController from "../../controllers/mangas/index.js";


const HomeRouter = Router();

HomeRouter.get('/', mangaController.getAllMangas);


export default HomeRouter;