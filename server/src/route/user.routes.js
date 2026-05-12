import express from 'express';
import profileController from '../controller/profile.controller.js';
import { verifyToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get(
  '/profile',
  verifyToken,
  authorizeRoles('user'),
  profileController.getCurrentUserProfile.bind(profileController),
);

export default router;

