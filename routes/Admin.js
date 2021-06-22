const express = require('express');
const adminController = require('../app/Controllers/Auth/AdminAuthController');
const authGuard = require('../guards/Auth');
const adminGuard = require('../guards/Admin');

const router = express.Router();

router.post(
  '/ssh504/create',
  authGuard.protect, 
  adminGuard.isAdmin,
  adminGuard.isSuper,
  adminController.create
); 

router.get(
  '/ssh504/fetchOne/:id',
  authGuard.protect,
  adminGuard.isAdmin,
  adminController.getOne
);

router.get(
  '/ssh504/fetchMe',
  authGuard.protect,
  adminGuard.isAdmin,
  adminController.getMe
);

module.exports = router;
