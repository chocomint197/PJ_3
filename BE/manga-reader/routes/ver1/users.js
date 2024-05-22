import { Router } from "express";
import userController from "../../controllers/user/index.js";
import middlewares from "../../middlewares/index.js";

const UserRouter = Router();

UserRouter.post('/user/register', middlewares.validateSignUp, userController.signUp);
UserRouter.post('/user/login', middlewares.validateSignIn, userController.signIn);
// UserRouter.get('/:id', middlewares.verifyAccessToken, userController.getUserInfo);
// UserRouter.put('/:id', middlewares.verifyAccessToken, userController.findByIdAndUpdate);

export default UserRouter;