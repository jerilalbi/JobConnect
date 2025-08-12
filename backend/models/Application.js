import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    coverLetter: { type: String },
    resume: {
        data: Buffer,
        contentType: String
    },
    status: { type: String, enum: ["applied", "shortlisted", "rejected"], default: "applied" }
});

export default mongoose.model("Application", applicationSchema);
