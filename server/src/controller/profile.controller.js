import userRepository from '../repository/user.repository.js';

class ProfileController {
  async getCurrentUserProfile(req, res) {
    try {
      const user = await userRepository.findSafeById(req.user.id);

      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      }

      return res.status(200).json({
        message: 'Lấy thông tin profile thành công',
        user,
      });
    } catch {
      return res.status(500).json({ message: 'Không thể lấy thông tin profile' });
    }
  }
}

export default new ProfileController();
