const catchAsync = require('../../../utils/catchAsync');
const adminService = require('../../Services/Auth/Admin');
const userService = require('../../Services/Auth/User');
const User = require('../../Models/Auth/User');

exports.create = catchAsync(async (req, res) => {
  req.body.type = 'email';
  req.body.role = 'admin';
  req.body.slug =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const newUser = await userService.createUser(req.body);

  req.user = newUser;

  /**
   * @param {{adminRole:string}} req.body
   */

  req.body.role = req.body.adminRole;
  const newAdmin = await adminService.createAdmin(req);

  await User.updateOne(
    { _id: newUser._id },
    {
      adminId: newAdmin._id,
    },
    { useFindAndModify: false, upsert: true }
  );

  return userService.createSendToken(newUser, 201, res);
});

exports.getOne = catchAsync(async (req, res) => {
  const result = await adminService.getOne(req.params.id, false, {
    path: 'user',
  });

  return res.status(201).json({
    status: 'success',
    data: {
      result,
    },
  });
});

exports.getMe = catchAsync(async (req, res) => {
  const result = await adminService.getOne(req.user.id, true, { path: 'user' });

  return res.status(201).json({
    status: 'success',
    data: {
      result,
    },
  });
});
