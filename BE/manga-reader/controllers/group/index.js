import Collections from "../../database/collection.js";
import GroupModel from "../../models/group/group.js";
import UserModel from "../../models/users/users.js";

const groupController = {
    getAllGroups: async(req,res) => {
        try {
            const groups = await GroupModel.find();
            res.status(200).json({
                groups,
                message: 'List groups',
                success: true
            })
        } catch (error) {
            res.status(500).json({
                data: null,
                message: 'Error',
                success: false,
                error: error.message
            });
        }
    },
    groupProfile: async(req,res) => {
        try {
            const { id } = req.params;
            const group = await GroupModel.findById(id)
            .populate('groupLeader')
            .populate('groupMembers');
            if (!group) throw new Error ('Group does not exists')
                res.status(201).send({
                    group,
                    message: 'Get group info success',
                    success:true
            })
        } catch (error) {
            res.status(404).send({
                data: null,
                message: error.message,
                error,
                success: false
                 });
        }
    },
    groupUploads: async(req,res) => {
        try {
            const { id } = req.params;
            const group = await GroupModel.findById(id);
            if (!group) throw new Error('Group does not exist')
                
                const uploads = await GroupModel.aggregate([
                    { $match: { _id: group._id } },
                    { $unwind: "$uploadedItems" },
                    {
                        $lookup: {
                            from: "mangas", 
                            localField: "uploadedItems.item",
                            foreignField: "_id",
                            as: "mangaData"
                        }
                    },
                    {
                        $lookup: {
                            from: "chapters",
                            localField: "uploadedItems.item",
                            foreignField: "_id",
                            as: "chapterData"
                        }
                    },
                    { $unwind: "$uploadedItemsData" },
                    { $replaceRoot: { newRoot: "$uploadedItemsData" } }
                ]);
                res.status(200).send({
                    data: uploads,
                    message: 'Group uploads retrieved successfully',
                    success: true
                });
        } catch (error) {
            res.status(404).send({
                data: null,
                message: error.message,
                error,
                success: false
                 });
        }
    },
    groupMembers: async(req,res) => {
        try {
            const { id } = req.params;
            const group = await GroupModel.findById(id);
            if(!group) {
                throw new Error('Group does not exist')
            }
            const members = await UserModel.find({ _id: { $in: group.groupMembers } }).populate('group', 'groupLeader');
            const leader = await UserModel.findById(group.groupLeader);
            if (leader) {
                members.unshift(leader)
            }
            
            res.status(200).json({
                members,
                message: 'List group members',
                success: true
            });
        } catch (error) {
            res.status(500).json({
                data: null,
                message: 'Error',
                success: false,
                error: error.message
            });
        }
    },
    createGroup: async(req,res) => {
        try {
            const { groupName, groupDescription } = req.body;
            
            let userId;
            if (typeof req.user === 'object' && req.user.userId) {
                userId = req.user.userId;
            } else {
                userId = req.user;
            }
            const groupCheck = await GroupModel.findOne({ groupName })
            if (groupCheck) throw new Error ('Group name already exists')
            const newGroup = new GroupModel({
                groupName: groupName,
                groupLeader: userId,
                groupMembers: [userId], 
                groupDescription: groupDescription,
                uploadedItems: [] 
            });
            await newGroup.save();
            const user = await UserModel.findById(userId);
             if (user) {
            user.group = newGroup._id;
            await user.updateRoles(); 
            await user.save();
            
        } else {
            throw new Error('User not found');
        }   
        const populatedGroup =  await GroupModel.findById(newGroup._id)
        .populate('groupLeader')
        .populate('groupMembers')


            res.status(201).json({
                group: populatedGroup,
                message: 'Group created successfully',
                success: true
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error creating group',
                success: false,
                error: error.message
            });
        }
    }

}

export default groupController