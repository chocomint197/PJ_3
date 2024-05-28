import { Router } from "express";
import UserRouter from "./users.js";
import RouterAuthentication from "./authentication.js";
import MangaRouter from "./mangas.js";
import HomeRouter from "./home.js";
const RouterV1 = Router();

RouterV1.use('/users', UserRouter);
// RouterV1.use('/posts', PostRouter);
// RouterV1.use('/comments', CommentRouter);
RouterV1.use('/authentication', RouterAuthentication);
RouterV1.use('/title', MangaRouter)
RouterV1.use(HomeRouter)
export default RouterV1;