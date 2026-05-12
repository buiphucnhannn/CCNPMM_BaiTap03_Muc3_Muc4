import express from 'express';
import authController from '../controller/auth.controller.js';
import { authLimiter } from '../middleware/rateLimit.middleware.js';
import { loginValidation } from '../validation/auth.validation.js';

const router = express.Router();

router.post(
  '/login',
  authLimiter,
  loginValidation,
  authController.login.bind(authController),
);

export default router;
