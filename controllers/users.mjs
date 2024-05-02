import User from '../models/User.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id: data._id });
    if (!user) throw new Error(`bad credentials`);

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();

    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      throw new Error('Invalid Login Credentials');
    } else {
      const token = await user.generateAuthToken();
      res.json({ user, token });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    //We normally would look up user but we made optimization by using middleware to get user for Auth Routes
    await req.user.save();
    res.json(user);
    updates.forEach((update) => (req.user[update] = req.body[update]));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await req.user.deleteOne();
    res.sendStatus(204);
  } catch (err) {}
};
export default { auth, createUser, loginUser, updateUser, deleteUser };
