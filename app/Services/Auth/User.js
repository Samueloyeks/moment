const jwt = require("jsonwebtoken");
const User = require("../../Models/Auth/User");
const factory = require("../../Helpers/handlerFactory");
const strategy = require("passport-facebook");

exports.createUser = async (req) => {
  return await User.create({
    fullName: req.fullName,
    email: req.email,
    phone: req.phone,
    type: req.type,
    role: req.role,
    slug: req.slug,
    password: req.password,
    picture: req.picture,
    adminId: req.adminId,
  });
};

exports.getUserDefault = factory.getOne(User);

exports.getUser = async (params, password) => {
  const query = User.findOne(params);
  if (password) query.select("+password");
  return await query;
};

exports.verify = async (slug) => {
  return await User.findOneAndUpdate(
    { slug: slug },
    {
      verified: true,
    }
  );
};


const signToken = (id) => {
  /**
   * @param {{JWT_EXPIRES_IN:string}} process.env
   */
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.createSendToken = (user, statusCode, res) => {
  /**
   * @param {{JWT_COOKIE_EXPIRES_IN:string}} process.env
   */
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
