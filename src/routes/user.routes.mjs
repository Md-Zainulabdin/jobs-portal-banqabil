import express from "express";
import {
    getAllUser,
    registerUser,
    removeUser,
    updateUser
} from "../controllers/user.controller.mjs";
import { check } from "express-validator";
import auth from "../middlewares/auth.mjs"


const router = express.Router();


router.route("/user").post([
    check("name", "Name is required!").not().isEmpty(),
    check("email", "Email is required!").isEmail(),
    check("password", "Password is required!").isLength({
        min: 6,
        max: 15
    }),
], registerUser);

router.route("/users").get(getAllUser);
router.route("/user/:id").put(auth, updateUser);
router.route("/user/:id").delete(auth, removeUser);

export default router;
