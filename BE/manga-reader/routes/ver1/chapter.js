import { Router } from "express";
import middlewares from "../../middlewares/index.js";
import chapterController from "../../controllers/chapters/index.js";
const ChapterRouter = Router();

ChapterRouter.post('/upload/:mangaId', middlewares.verifyAccessToken, middlewares.uploadMultipleImages, chapterController.createChapter);
ChapterRouter.get('/title/:mangaId/chapter/:chapterId', chapterController.chapterInfo);

export default ChapterRouter;   