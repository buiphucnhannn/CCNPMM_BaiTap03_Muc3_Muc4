import 'dotenv/config'

const env = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/it_student_forum',
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || 'default_jwt_secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
}

export default env
