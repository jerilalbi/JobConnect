import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { approveJob, createJob, deleteJob, disapproveJob, getAllJobs, getAllJobsAdmin, getJobsEmployer, updateJob } from '../controllers/jobController.js';

const router = express.Router();

router.post('/post', protect, authorizeRoles('employer'), createJob);
router.put('/:id', protect, authorizeRoles('employer'), updateJob);
router.delete('/:id', protect, authorizeRoles('employer'), deleteJob);
router.get('/my-jobs', protect, authorizeRoles('employer'), getJobsEmployer);
router.get('/', protect, getAllJobs)
router.get('/all-jobs', protect, authorizeRoles('admin'), getAllJobsAdmin)
router.put('/:jobId/approve', protect, authorizeRoles('admin'), approveJob);
router.put('/:jobId/disapprove', protect, authorizeRoles('admin'), disapproveJob);

export default router;