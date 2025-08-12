import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { createJob } from '../controllers/jobController.js';

const router = express.Router();

router.post('/post', protect, authorizeRoles('employer'), createJob);

export default router;