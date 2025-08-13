import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { myApplicationJobIds, myApplications, showApplicants, showResume, submitApplication, updateApplicationStatus } from '../controllers/applicationController.js';
import multer from "multer";

const upload = multer();
const router = express.Router();

router.post('/:jobId/apply', protect, authorizeRoles('jobseeker'), upload.single("resume"), submitApplication)
router.get('/:jobId/applicants/:applicationId/resume', protect, showResume)
router.put('/:jobId/applicants/:applicationId/status', protect, authorizeRoles('employer'), updateApplicationStatus)
router.get('/:jobId/applicants', protect, authorizeRoles('employer'), showApplicants)
router.get('/my-application', protect, authorizeRoles('jobseeker'), myApplications)
router.get('/applied-jobs', protect, authorizeRoles('jobseeker'), myApplicationJobIds)

export default router;