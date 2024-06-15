import { Router } from "express";
import UserRouter from "./users.js";
import RouterAuthentication from "./authentication.js";
import MangaRouter from "./mangas.js";
import HomeRouter from "./home.js";
import GroupRouter from "./group.js";
import ChapterRouter from "./chapter.js";
const RouterV1 = Router();

RouterV1.use('/users', UserRouter);
RouterV1.use('/authentication', RouterAuthentication);
RouterV1.use('/title', MangaRouter)
RouterV1.use(HomeRouter)
RouterV1.use('/group', GroupRouter)
RouterV1.use('/chapter', ChapterRouter)
export default RouterV1;