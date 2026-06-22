import User from "../models/User.model.js";
import bcrypt from 'bcryptjs';
import generateToken from "../utils/generate-token.utils.js";

export const register = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        })
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    });

    return {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
    }
}

export const login = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid email or password")
    }
    const token = generateToken(user._id);

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    }
}