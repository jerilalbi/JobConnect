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
