import { Router } from "express";
import middlewares from "../../middlewares/index.js";
import groupController from "../../controllers/group/index.js";
const GroupRouter = Router();
GroupRouter.post('/create',  middlewares.verifyAccessToken, groupController.createGroup)
GroupRouter.get('/list', middlewares.verifyAccessToken, groupController.getAllGroups );
GroupRouter.get('/:id', middlewares.verifyAccessToken, groupController.groupProfile );
GroupRouter.get('/:id/upload', middlewares.verifyAccessToken, groupController.groupUploads);
GroupRouter.get('/:id/members', middlewares.verifyAccessToken,groupController.groupMembers )
export default GroupRouter;