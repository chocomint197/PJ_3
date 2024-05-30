import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()
const generateToken = (document, type) => {
    const getSecretKey = (type === 'AT' ? process.env.AT_SECRETKEY : process.env.RT_SECRETKEY);
    const getExp = (type === 'AT' ? 300 : 86400 )
    const token = jwt.sign(document, getSecretKey, {
        expiresIn: getExp
    });
    return token;
};

const verifyToken = (token, type) => {
    const getSecretKey = (type === 'AT' ? process.env.AT_SECRETKEY : process.env.RT_SECRETKEY);
    const verifyToken = jwt.verify(token, getSecretKey);
    return verifyToken;
}
export {
    generateToken,
    verifyToken
}