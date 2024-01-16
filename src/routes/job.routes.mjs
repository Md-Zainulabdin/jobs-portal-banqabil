import express from "express";
import auth from "../middlewares/auth.mjs"
import { createJob, deleteJob, getAllJobs, updateJob } from "../controllers/job.controller.mjs";

const router = express.Router();

// routes

router.route('/job/create').post(auth, createJob);
router.route('/job/update/:id').put(auth, updateJob);
router.route('/job/delete/:id').delete(auth, deleteJob);
router.route('/jobs').get(auth, getAllJobs);


export default router;