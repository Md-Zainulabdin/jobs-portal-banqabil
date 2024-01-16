import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: { type: String, required: true },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    description: { type: String, required: true },
    salary: { type: String, required: true },
    slug: { type: String, required: true },
    jobType: { type: String, required: true, enum: ["Remote", "Hybrid", "On-site"] },
    location: { type: String, required: true },
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

const Job = mongoose.model("Job", jobSchema);
export default Job;