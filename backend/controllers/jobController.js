import Job from "../models/Jobs.js";

export const createJob = async (req, res) => {
    try {
        const { title, description, location, salary, jobType, expirationDate } = req.body;

        const job = await Job.create({
            title,
            description,
            location,
            salary,
            jobType,
            expirationDate,
            postedBy: req.user.id
        });

        res.status(200).json({
            success: true,
            message: "Job posted successfully",
            job
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        if (job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json({ success: true, message: "Job updated successfully", job: updatedJob });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        if (job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        await job.deleteOne();

        res.json({ success: true, message: "Job deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const getJobsEmployer = async (req, res) => {
    try {
        const jobs = await Job.find({ postedBy: req.user.id });
        res.json({ success: true, jobs })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ status: "approved" }).populate("postedBy", "name email");
        res.json({ success: true, jobs });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const getAllJobsAdmin = async (req, res) => {
    try {
        const jobs = await Job.find().populate("postedBy", "name email");
        res.json({ success: true, jobs });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const approveJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(
            req.params.jobId,
            { status: "approved" },
            { new: true }
        );

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        res.json({ success: true, message: "Job approved", job });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const disapproveJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(
            req.params.jobId,
            { status: "deactivated" },
            { new: true }
        );

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        res.json({ success: true, message: "Job deactivated", job });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}
