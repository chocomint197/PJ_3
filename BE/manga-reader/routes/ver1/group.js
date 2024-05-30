import { Router } from "express";
import middlewares from "../../middlewares/index.js";
import groupController from "../../controllers/group/index.js";
const GroupRouter = Router();
GroupRouter.post('/create',  middlewares.verifyAccessToken, groupController.createGroup)
GroupRouter.get('/list', groupController.getAllGroups );
GroupRouter.get('/:id', groupController.groupProfile );
GroupRouter.get('/:id/upload', groupController.groupUploads);
GroupRouter.get('/:id/members', groupController.groupMembers )
export default GroupRouter;