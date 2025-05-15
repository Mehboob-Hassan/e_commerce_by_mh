import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();


const createUser = async (req, res, next) => {
    const { name, email, role, password } = req.body;

    // Validate the request body
    if (!name || !email || !role || !password) {
        return res.status(400).json({
            status: "fail",
            message: "Please provide name, email, role and password"
        });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        return res.status(400).json({
            status: "fail",
            message: "User already exists"
        });
    }

    const hashed = await bcrypt.hash(password, 10);

    console.log("Hashed one is", hashed);

    try {
        const user = await User.create({
            name,
            email,
            role,
            password: hashed
        })

        res.status(201).json({
            status: "success",
            data: {
                user
            }
        });
    } catch (error) {
        next(error);
    }
}


// Login User
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ error: "Invalid Credentials" });
        }
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            res.status(400).json({ error: "Invalid Username or Password" });
        }

        const token = jwt.sign({ id: user._id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        next(error);
    }


}


export { createUser, loginUser }