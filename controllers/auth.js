import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/index.js";

export const register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      avatarUrl,
      dateOfBirth,
      age,
      gender,
      bio,
    } = req.body;

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hash,
      avatarUrl,
      dateOfBirth,
      age,
      gender,
      bio,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) return next(createError(404, "User not found!"));

    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!correctPassword) return next(createError(400, "Invalid password!"));

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password, ...userDoc } = user._doc;
    res
      .cookie("accessToken", accessToken)
      .status(200)
      .json({ ...userDoc });
  } catch (error) {
    next(error);
  }
};
