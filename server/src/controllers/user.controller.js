import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model";
import config from "../config";

const create = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();

    return res.status(200).json({ message: "User registered successfully." });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const login = async (req, res, next) => {
  const user = await User.findOne({ name: req.body.name }, null);
  if (!user) return res.status(400).json({ error: "Username did not found!" });

  const checkPassword = await bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (!checkPassword)
    return res
      .status(400)
      .json({ error: "The password and username do not match!" });

  req.session.user = user;

  const token = jwt.sign({ id: user._id }, config.secret);
  res.cookie("token", token, { expire: new Date() + 999, httpOnly: true });

  return res
    .status(200)
    .json({ user: { id: user._id, name: user.name }, token });
};

const logout = (req, res, next) => {
  req.session.destroy();
  res.clearCookie("token");
  res.clearCookie("connect.sid");
  return res.status(200).json({ message: "User logged out successfully. " });
};

const isAuthenticated = (req, res, next) => {
  const user = req.user;
  return res.status(200).json({ user: { id: user._id, name: user.name } });
};

export default { create, login, logout, isAuthenticated };
