import Job from "../models/job.model.mjs";


export const createJob = async (req, res) => {
    try {
        const { title, description, slug, email, jobType, location, salary } = req.body

        if ([title, description, slug, email, jobType, location, salary].some((field) => field.trim() == "")) {
            return res.status(400).json({ msg: "Every field is required!" })
        }

        const job = await Job.create({
            title,
            description,
            slug,
            email,
            jobType,
            location,
            salary,
            user: req.user.id
        });

        return res.status(201).json({ msg: "Job created!", job })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const updateJob = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ msg: "jobId is required!" })
        }

        const { title, description, slug, email, jobType, location, salary } = req.body

        const jobFields = {}

        if (title) jobFields.title = title;
        if (description) jobFields.description = description;
        if (slug) jobFields.slug = slug;
        if (email) jobFields.email = email;
        if (jobType) jobFields.jobType = jobType;
        if (location) jobFields.location = location;
        if (salary) jobFields.salary = salary;

        let job = await Job.findById(id);

        if (!job) {
            return res.status(400).json({
                msg: 'Job not found',
            });
        }

        if (req.user.id.toString() !== job.user.toString()) {
            res.status(401).json({
                msg: 'Invalid authorization',
            });
        }

        job = await Job.findByIdAndUpdate(
            id,
            { $set: jobFields },
            { new: true }
        );

        return res.status(200).json({ msg: "Job Updated!", job });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
}


export const deleteJob = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ msg: "id is required!" });
        }

        let job = await Job.findById(id);

        if (!job) {
            return res.status(400).json({
                msg: 'Job not found',
            });
        }

        if (req.user.id.toString() !== job.user.toString()) {
            res.status(401).json({
                msg: 'Invalid authorization',
            });
        }

        const deletedJob = await Job.deleteOne({
            _id: id,
        });

        return res.status(200).json({ msg: "Job deleted!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ user: req.user.id }).sort({
            created_at: -1
        });

        return res.status(200).json({ jobs: jobs })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
}