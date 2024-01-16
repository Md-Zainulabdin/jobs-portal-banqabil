import express from "express";
import { getUser, loginUser } from "../controllers/auth.controller.mjs";
import { check } from "express-validator";
import auth from "../middlewares/auth.mjs"

const router = express.Router();

// routes
router.route("/login").post(
  [
    check("email", "Email is required!").not().isEmpty(),
    check("password", "Password is required!").isLength({
      min: 6,
      max: 15,
    }),
  ],
  loginUser
);
router.route("/authUser").get(auth, getUser)

export default router;
