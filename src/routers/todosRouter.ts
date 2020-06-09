import {Router} from 'express';
import { getTodos, createTodo, deleteTodo, toggleComplete } from '../db/todosQueries';
import { validateSchema } from '../middleware/validateSchema';
import { todoSchema } from '../schemas/todoSchema';

export const todosRouter = Router();

todosRouter.get('/', async (req, res) => {
    const { userId } = (req as any).user;
    const todos = await getTodos(userId);
    res.send(todos);
});

todosRouter.post('/', validateSchema(todoSchema), async (req, res) => {
    const {userId} = (req as any).user;
    const {description, dueDate} = req.body;
    const todoId = await createTodo(userId, description, dueDate);
    res.send({todoId});
});

todosRouter.delete('/:todoId', async (req, res) => {
    const {userId} = (req as any).user;
    const {todoId} = req.params;
    const todoIdNum = Number(todoId);
    if (isNaN(todoIdNum)) {
        return res.send(400).send('id must be a number!');
    }
    const isDeleted = await deleteTodo(todoIdNum, userId);
    if (isDeleted) {
        res.send('ok');
    } else {
        res.status(404).send("todo doesn't exist");
    }
});

todosRouter.put('/:todoId/toggle', async (req, res) => {
    const {userId} = (req as any).user;
    const {todoId} = req.params;
    const todoIdNum = Number(todoId);
    if (isNaN(todoIdNum)) {
        return res.send(400).send('id must be a number!');
    }
    const isSuccess = await toggleComplete(todoIdNum, userId);
    if (isSuccess) {
        res.send('ok');
    } else {
        res.status(404).send("todo doesn't exist");
    }
});