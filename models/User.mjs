import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo'}], //Points to Todo collection in db
  },
  {
    timestamps: true,
  }
);

// Before we save, if password has been modified, excrypt password.
userSchema.pre('save', async function (next) {
  this.isModified('password')
    ? (this.password = await bcrypt.hash(this.password, 10))
    : null;
  next();
});

//Any document we get back we can call GAT and we can recall document for that user
userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET);
  return token;
};

const User = mongoose.model('User', userSchema);

export default User;
