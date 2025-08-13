import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    company: { type: String, required: true },
    salary: { type: String, required: true },
    jobType: { type: String, enum: ["Full-Time", "Part-Time", "Remote", "Contract"], required: true },
    expirationDate: { type: Date, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "approved", "deactivated"], default: "pending" }
}, { timestamps: true })

export default mongoose.model("Job", jobSchema);