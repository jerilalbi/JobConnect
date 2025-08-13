import Application from "../models/Application.js";
import Job from "../models/Jobs.js";

export const submitApplication = async (req, res) => {
    try {

        const existingApplication = await Application.findOne({
            job: req.params.jobId,
            applicant: req.user.id
        });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job"
            });
        }

        const application = await Application.create({
            job: req.params.jobId,
            applicant: req.user.id,
            coverLetter: req.body.coverLetter || '',
            resume: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        });

        res.json({ success: true, application });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const showResume = async (req, res) => {
    try {
        const { jobId, applicationId } = req.params;

        const application = await Application.findById(applicationId).populate("applicant", "name");
        if (!application || !application.resume || !application.resume.data) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        const job = await Job.findById(jobId);
        const isJobPoster = job && job.postedBy.toString() === req.user.id;
        const isJobApplicant = application.applicant._id.toString() === req.user.id;

        if (!isJobPoster && !isJobApplicant) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to view this resume"
            });
        }

        res.set({
            "Content-Type": application.resume.contentType,
            "Content-Disposition": `inline"`
        });

        res.send(application.resume.data);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const showApplicants = async (req, res) => {
    try {
        const { jobId } = req.params;

        const job = await Job.findOne({ _id: jobId, postedBy: req.user.id });
        if (!job) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to view applicants for this job"
            });
        }

        const applicants = await Application.find({ job: jobId })
            .populate("applicant", "name email")
            .select("-resume");

        res.status(200).json({
            success: true,
            jobTitle: job.title,
            totalApplicants: applicants.length,
            applicants
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const updateApplicationStatus = async (req, res) => {
    try {
        const { jobId, applicationId } = req.params;
        const { status } = req.body;

        const job = await Job.findOne({ _id: jobId, postedBy: req.user.id });

        if (!job) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to change the status this job"
            });
        }

        const application = await Application.findByIdAndUpdate(
            applicationId,
            { status: status },
            { new: true }
        )

        if (!application) return res.status(400).json({ success: false, message: 'Application not found' });

        res.json({ success: true, message: 'Application status updated', application })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const myApplications = async (req, res) => {
    try {
        const applications = await Application.find({ applicant: req.user.id }).populate('job', 'title company');
        res.json({ success: true, applications })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const myApplicationJobIds = async (req, res) => {
    try {
        const applications = await Application.find({ applicant: req.user.id }).select('job');
        const jobIds = applications.map(app => app.job)
        res.json({ success: true, jobIds })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}