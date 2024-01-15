import express from "express";
import auth from "../middlewares/auth.js"
import { createJob, deleteJob, getAllJobs, updateJob } from "../controllers/job.controller.js";

const router = express.Router();

// routes

router.route('/job/create').post(auth, createJob);
router.route('/job/update/:id').put(auth, updateJob);
router.route('/job/delete/:id').delete(auth, deleteJob);
router.route('/jobs').get(auth, getAllJobs);


export default router;