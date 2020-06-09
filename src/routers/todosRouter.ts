import {Router} from 'express';
import { getTodos } from '../db/todosQueries';

export const todosRouter = Router();

todosRouter.get('/', async (req, res) => {
    const { userId } = (req as any).user;
    const todos = await getTodos(userId);
    res.send(todos);
})