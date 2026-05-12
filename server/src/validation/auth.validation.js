import { body } from 'express-validator';

export const loginValidation = [
  body('email').isEmail().withMessage('Email kh\u00F4ng h\u1EE3p l\u1EC7').normalizeEmail(),
  body('password').notEmpty().withMessage('M\u1EADt kh\u1EA9u kh\u00F4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng'),
];
