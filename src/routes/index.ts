import { Router } from 'express';
import { router as authRoutes } from './route-files/auth.route';
import { router as noteRoutes } from './route-files/note.route';

export const router = Router();

router.use(`/auth`, authRoutes);
router.use('/notes', noteRoutes);
