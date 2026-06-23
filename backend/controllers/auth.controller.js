import { register, login } from "../services/auth.service.js";

export const registerUser = async(req,res) => {
    try {
        const user = await register(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const {token, user} = await login(req.body);

        //set HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure:false, // true in production
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 day
        });

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user
        })
    } catch (error) {        
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export const logoutUser = async(req,res) => {
    try {
        res.clearCookie("token",{
            httpOnly: true,
            secure: false,
            sameSite: "strict" // true in production
        });
        
        res.status(200).json({
            success : true,
            message : "Logout successfully"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal server error"
        });
    }
};

export const getCurrentUser = async(req,res) => {
    try {
        res.status(200).json({
            success : true,
            user : req.user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message : "Internal server error"
        });
    }
}