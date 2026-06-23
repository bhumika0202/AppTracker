import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export const protect = async(req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if(!user){
            return res.status(401).json({
                success : false,
                message : "Unauthorized"
            });
        }
        req.user = {
            id : user._id,
            name : user.name,
            email : user.email
        }
        next();
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal server error"
        });
    }
};