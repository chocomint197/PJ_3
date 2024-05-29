import { Router } from "express";
import userController from "../../controllers/user/index.js";
import middlewares from "../../middlewares/index.js";

const UserRouter = Router();

UserRouter.post('/signup', middlewares.validateSignUp, userController.signUp);
UserRouter.post('/signin', middlewares.validateSignIn, userController.signIn);
UserRouter.get('/profile/:id', middlewares.verifyAccessToken, userController.getUserInfo);
// UserRouter.put('/:id', middlewares.verifyAccessToken, userController.findByIdAndUpdate);
UserRouter.get('/lists', userController.getAllUsers);
export default UserRouter;