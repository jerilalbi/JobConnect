import User from '../models/User.js'
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const newUser = await User.create({ name, email, password, role });

        res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            token: generateToken(newUser._id, newUser.role)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const loginUser = await User.findOne({ email });
        if (loginUser && (await loginUser.matchPassword(password))) {
            res.json({
                _id: loginUser._id,
                name: loginUser.name,
                email: loginUser.email,
                role: loginUser.role,
                token: generateToken(loginUser._id, loginUser.role)
            })
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}