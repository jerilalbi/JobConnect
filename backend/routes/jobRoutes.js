import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { createJob, deleteJob, getAllJobs, getJobsEmployer, updateJob } from '../controllers/jobController.js';

const router = express.Router();

router.post('/post', protect, authorizeRoles('employer'), createJob);
router.put('/:id', protect, authorizeRoles('employer'), updateJob);
router.delete('/:id', protect, authorizeRoles('employer'), deleteJob);
router.get('/my-jobs', protect, authorizeRoles('employer'), getJobsEmployer);
router.get('/', protect, getAllJobs)

export default router;