const express = require('express');
const authController = require('../app/Controllers/Auth/AuthController');
const authGuard = require('../guards/Auth');

const router = express.Router();

router.get('/', authController.index);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/verify/:token', authController.verify);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.post('/auth/facebook', authController.facebookAuth);
router.post('/auth/google', authController.googleAuth);


//For Admin Creation
router.get(
  '/getUser',
  authGuard.protect,
  authController.getMe,
  authController.getUser
);

router.get('/_ah/start', authController.index)
router.get('/_ah/warmup', authController.index);

module.exports = router;
