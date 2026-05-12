import User from '../model/user.model.js';

class UserRepository {
  async findByEmail(email) {
    return User.findOne({ email });
  }
}

export default new UserRepository();
