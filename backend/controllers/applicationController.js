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

export const downloadResume = async (req, res) => {
    try {
        const { jobId, applicationId } = req.params;

        const job = await Job.findOne({ _id: jobId, postedBy: req.user.id });
        if (!job) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to view resumes for this job"
            });
        }

        const application = await Application.findById(applicationId).populate("applicant", "name");
        if (!application || !application.resume || !application.resume.data) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        const applicantName = application.applicant?.name?.replace(/\s+/g, "_") || "applicant";
        const jobTitle = job.title?.replace(/\s+/g, "_") || "job";
        const fileName = `resume-${applicantName}-${jobTitle}`;

        res.set({
            "Content-Type": application.resume.contentType,
            "Content-Disposition": `attachment; filename="${fileName}"`
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