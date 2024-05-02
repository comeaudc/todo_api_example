import Todo from '../models/Todo.mjs';
import User from '../models/User.mjs';

const create = async (req, res) => {
  try {
    res.body.user = req.user._id;
    const todo = await Todo.create(req.body);
    req.user.todos
      ? req.user.todos.addToSet({ _id: todo._id })
      : (req.user.todos = [{ _id: todo._id }]);
    await req.user.save();
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const show = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const indexCompleted = async (req, res) => {
  try {
    const todos = await Todo.find({ completed: true, user: req.user._id });
    res.json(todos);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const indexNotCompleted = async (req, res) => {
  try {
    const todos = await Todo.find({ completed: false, user: req.user._id });
    res.json(todos);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOnceAndDelete({ _id: req.params.id });
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export default {
  create,
  show,
  update,
  deleteTodo,
  indexNotCompleted,
  indexCompleted,
};
