import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { changeJobStatus, createJob, deleteJob, getAllJobs, getAllJobsAdmin, getJobsEmployer, updateJob } from '../controllers/jobController.js';

const router = express.Router();

router.post('/post', protect, authorizeRoles('employer'), createJob);
router.put('/:id', protect, authorizeRoles('employer'), updateJob);
router.delete('/:id', protect, authorizeRoles('employer'), deleteJob);
router.get('/my-jobs', protect, authorizeRoles('employer'), getJobsEmployer);
router.get('/', protect, getAllJobs)
router.get('/all-jobs', protect, authorizeRoles('admin'), getAllJobsAdmin)
router.put('/:jobId/update-status', protect, authorizeRoles('admin'), changeJobStatus);

export default router;