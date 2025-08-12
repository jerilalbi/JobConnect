import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { downloadResume, showApplicants, submitApplication } from '../controllers/applicationController.js';
import multer from "multer";

const upload = multer();
const router = express.Router();

router.post('/:jobId/apply', protect, authorizeRoles('jobseeker'), upload.single("resume"), submitApplication)
router.post('/:jobId/applicants/:applicationId/resume', protect, authorizeRoles('employer'), downloadResume)
router.post('/:jobId/applicants/', protect, authorizeRoles('employer'), showApplicants)

export default router;