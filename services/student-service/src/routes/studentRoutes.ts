import { Router } from 'express';
import { getProfile, getDashboard } from '../controllers/studentController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

// Semua route student membutuhkan JWT yang valid
router.get('/profile', verifyToken, getProfile);
router.get('/dashboard', verifyToken, getDashboard);

export default router;
