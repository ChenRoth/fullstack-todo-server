import {sql} from './sql';

export async function getTodos(userId: number) {
    const [todos] = await sql.execute('SELECT * FROM todos WHERE userId = ?', [userId]);
    return todos;
}

export async function createTodo(userId: number, description: string, dueDate: Date): Promise<number> {
    const [{insertId: todoId}] = await sql.execute('INSERT INTO todos (userId, description, dueDate) VALUES (?, ?, ?)', [userId, description, dueDate]);
    return todoId;
}