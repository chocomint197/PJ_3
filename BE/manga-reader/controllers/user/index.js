import UserModel from "../../models/users/users.js";
import bcryptHashing  from "../../utils/bcrypt.js";
import { generateToken } from "../../utils/token.js";

const userController = {
    signUp: async (req, res) => {
        try {
            const { email, password, confirmPassword, userName } = req.body;

            const existedEmail = await UserModel.findOne({
                email
            });
            if (existedEmail) throw new Error('Email đã tồn tại!');
            const existedUserName = await UserModel.findOne({
                userName
            })

            if(existedUserName) throw new Error ('Username đã tồn tại')
            if (password !== confirmPassword) throw new Error('Mật khẩu không trùng khớp')
            const hash = bcryptHashing.hashingPassword(password);
            const newUser = await UserModel.create({
                email,
                password: hash.password,
                salt: hash.salt,
                userName
            });
            res.status(201).send({
                data: newUser,
                message: 'Đăng ký thành công',
                success: true
            })
        } catch (error) {

            res.status(403).send({
                data: null,
                message: error.message,
                success: false,
                error
            });
        }
    },
    signIn: async (req, res) => {
        try {
            const { emailOrUsername , password } = req.body;
            const isEmail = /\S+@\S+\.\S+/.test(emailOrUsername);

            let currentUser;
            if (isEmail) {
                currentUser = await UserModel.findOne({ email: emailOrUsername });
            } else {
                currentUser = await UserModel.findOne({ username: emailOrUsername });
            }

            if (!currentUser) throw new Error('Sai tài khoản hoặc mật khẩu!');
            const checkPassword = bcryptHashing.verifyPassword(password, currentUser.password, currentUser.salt);
            if (!checkPassword) throw new Error('Sai tài khoản hoặc mật khẩu!');

            const getUser = {
                ...currentUser.toObject()
            };
            delete getUser.salt;
            delete getUser.password;
            const accessToken = generateToken({
                userId: getUser._id,
                email: getUser.email,
                typeToken: 'AT'
            }, 'AT');

            const refreshToken = generateToken({
                userId: getUser._id,
                email: getUser.email,
                typeToken: 'RT'
            }, 'RT');

            res.status(200).send({
                data: {
                    ...getUser,
                    accessToken,
                    refreshToken
                },
                message: 'Xác thực thông tin thành công!',
                success: true
            })
        } catch (error) {
            res.status(401).send({
                data: null,
                message: error.message,
                success: false,
                error
            });
        }
    },
    getAllUsers: async(req,res) => {
        try {
            const users = await UserModel.find();
            res.status(200).json({
                data: users,
                message:'List users',
                success: true
            })
        } catch (error) {
            console.error("Error while fetching users:", error);
            res.status(500).json({
                data: null,
                message: 'Đã xảy ra lỗi khi lấy danh sách người dùng',
                success: false,
                error: error.message
            });
        }
    },
    getUserInfo: async (req, res) => {
        try {
            const { id } = req.params;
            const currentUser = await UserModel.findById(id, {
                password: 0,
                salt: 0
            });
            res.status(200).send({
                data: currentUser,
                message: 'Thành công!',
                success: true
            })
        } catch (error) {
            res.status(401).send({
                data: null,
                message: error.message,
                error,
                success: false
            });
        }
    },
    // findByIdAndUpdate: async (req, res) => {
    //     try {
    //         const { id } = req.params;
    //         const { userName, password, avatar, gender } = req.body;
    //         const user = req.user;
    //         if (user.useId !== id) throw new Error('Bạn không thể thực hiện hành động!');
    //         await UserModel.findOneAndUpdate({
    //             _id: id,
    //         }, {
    //             userName,
    //             password,
    //             avatar,
    //             gender
    //         })
    //     } catch (error) {
    //         res.status(403).send({
    //             data: null,
    //             message: error.message,
    //             error,
    //             success: false
    //         });
    //     }
    // }
};
export default userController;