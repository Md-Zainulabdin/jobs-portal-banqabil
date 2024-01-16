import { verifyEmail } from "../helpers/index.mjs";
import User from "../models/user.model.mjs";
import { validationResult } from "express-validator"
import bcrypt from "bcryptjs"

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }


        if ([name, email, password].some((field) => field.trim() === "")) {
            return res.status(400).json({ msg: "Every field is required!" });
        }

        if (verifyEmail(email)) {
            res.status(403).send({ message: `Please enter a valid Email!` });
            return;
        }

        const isUserExist = await User.findOne({
            email: email,
        });

        if (isUserExist) {
            return res
                .status(403)
                .json({ msg: "User with this email already exist!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        return res.status(201).json({ msg: "User created successfully" });
    } catch (error) {
        console.log(`User-Register-Error`, error);
        return res
            .status(500)
            .json({ msg: "An error occured while registering user" });
    }
};

export const removeUser = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ msg: "id is required!" });
        }

        const deletedUser = await User.deleteOne({
            _id: id,
        });

        return res.status(200).json({ msg: "User deleted!" });
    } catch (error) {
        console.log(`User-Removed-Error`, error);
        return res
            .status(500)
            .json({ msg: "An error occured while removing user" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ msg: "id is required!" });
        }

        const { name, email } = req.body;

        const userFields = {};

        if (name) userFields.name = name;
        if (email) userFields.email = email;

        let user = await User.findById(id)

        if (!user) {
            return res.status(400).json({
                msg: 'User not found',
            });
        }

        if (req.user.id.toString() !== user.id) {
            res.status(401).json({
                msg: 'Invalid authorization',
            });
        }

        user = await User.findByIdAndUpdate(
            id,
            { $set: userFields },
            { new: true }, //return the updated user instead of original one
        ).select("-password");

        return res.status(200).json({ msg: "User Updated!", user });
    } catch (error) {
        console.log(`User-Updated-Error`, error);
        return res
            .status(500)
            .json({ msg: "An error occured while updating user" });
    }
};

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select("name email");
        return res.status(200).json({ users });
    } catch (error) {
        console.log(`User-Get-Error`, error);
        return res.status(500).json({ msg: "An error occured while getting user" });
    }
};
