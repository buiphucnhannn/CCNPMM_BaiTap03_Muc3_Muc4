import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../config/environment.js';
import userRepository from '../repository/user.repository.js';

class AuthService {
  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw { status: 401, message: 'Email ho\u1EB7c m\u1EADt kh\u1EA9u kh\u00F4ng \u0111\u00FAng' };
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw { status: 401, message: 'Email ho\u1EB7c m\u1EADt kh\u1EA9u kh\u00F4ng \u0111\u00FAng' };
    }

    if (!user.isActive) {
      throw { status: 403, message: 'T\u00E0i kho\u1EA3n ch\u01B0a \u0111\u01B0\u1EE3c k\u00EDch ho\u1EA1t' };
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN },
    );

    const userObj = user.toObject();
    delete userObj.password;

    return { user: userObj, token };
  }
}

export default new AuthService();
