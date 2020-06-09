import {sql} from './sql';

export async function getTodos(userId: number) {
    const [todos] = await sql.execute('SELECT * FROM todos WHERE userId = ?', [userId]);
    return todos;
}