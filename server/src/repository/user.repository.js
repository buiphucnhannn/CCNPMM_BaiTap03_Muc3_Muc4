import User from '../model/user.model.js';

class UserRepository {
  async findByEmail(email) {
    return User.findOne({ email });
  }

  async findSafeById(id) {
    return User.findById(id).select('-password');
  }
}

export default new UserRepository();
