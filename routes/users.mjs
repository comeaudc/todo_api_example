import express from 'express';
const router = express.Router();
import userCtrl from '../controllers/users.mjs';

// Create User /users
router.post('/', userCtrl.createUser);
//Login User /users/login
router.post('/login', userCtrl.auth, userCtrl.updateUser);
//Update User /users/:id
router.put('/:id', userCtrl.auth, userCtrl.updateUser);
//Delete User /users/:id
router.put('/:id', userCtrl.auth, userCtrl.deleteUser);

export default router;
