import {Router} from 'express';
import { getTodos, createTodo } from '../db/todosQueries';
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