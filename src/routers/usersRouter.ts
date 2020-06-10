import {Router} from 'express';
import { registerSchema } from '../schemas/registerSchema';
import { validateSchema } from '../middleware/validateSchema';
import { register, login } from '../db/usersQueries';
import { loginSchema } from '../schemas/loginSchema';
import jwt from 'jsonwebtoken';

const {JWT_SECRET = 'secret'} = process.env;

const usersRouter = Router();

usersRouter.post('/register', validateSchema(registerSchema), async (req, res) => {
    const { username, password, email } = req.body;
    const userId = await register(username, password, email);
    if (!userId) {
        return res.status(403).send(`user ${username} already exists`);
    }
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.send({token});
});

usersRouter.post('/login', validateSchema(loginSchema), async (req, res) => {
    const { username, password } = req.body;
    const userId = await login(username, password);
    if (!userId) {
        return res.status(401).send("username or password don't match");
    }
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.send({token});
});


export {usersRouter}