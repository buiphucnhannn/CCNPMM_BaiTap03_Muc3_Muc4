import { validationResult } from 'express-validator';
import authService from '../service/auth.service.js';

class AuthController {
  checkValidationErrors(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return null;
  }

  async login(req, res) {
    const validationError = this.checkValidationErrors(req, res);
    if (validationError) return validationError;

    try {
      const { email, password } = req.body;
      const { user, token } = await authService.login(email, password);
      const redirectUrl = user.role === 'admin' ? '/admin/profile' : '/user/profile';

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        message: '\u0110\u0103ng nh\u1EADp th\u00E0nh c\u00F4ng',
        user,
        redirectUrl,
      });
    } catch (error) {
      const status = error.status || 400;
      res.status(status).json({ message: error.message });
    }
  }
}

export default new AuthController();
