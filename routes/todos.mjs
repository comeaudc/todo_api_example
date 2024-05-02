import express from 'express'
const router = express.Router()
import todoCtrl from '../controllers/todos.mjs'
import userCtrl from '../controllers/users.mjs'

//Index /todos
router.get('/', userCtrl.auth, todoCtrl.indexNotCompleted)
// Index /todos/completed
router.get('/completed', userCtrl.auth, todoCtrl.indexCompleted)
// Delete /todos/:id
router.delete('/:id', userCtrl.auth, todoCtrl.deleteTodo)
//Update /todos/:id
router.put('/:id', userCtrl.auth, todoCtrl.update)
// Create /todos
router.post('/', userCtrl.auth, todoCtrl.create)
// Show /todos/:id
router.get('/:id', userCtrl.auth, todoCtrl.show)

export default router