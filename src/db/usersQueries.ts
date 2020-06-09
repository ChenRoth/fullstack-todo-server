import {sql} from './sql';
// this is the package we use for hashing (encrypting) passwords
import {compare, hash} from 'bcrypt';

export async function register(username: string, password: string, email: string | null = null): Promise<number | null> {
    // check if username exists already
    const [users] = await sql.execute('SELECT id FROM users WHERE username = ?', [username]);
    if (users.length > 0) {
        // user already exists, user will not be created
        return null;
    }

    /* in production systems, we MUST NOT store the password in db in plain text
    / instead, we pass it through a hash function, so even if someone hacks the db it'll be hard to get your users' passwords
      
      WAIT! what's a hash function??    
      a hash function takes a string and uses an algorithm to change the string into a random sequence of characters that can't be decoded back to the original string

      so for example, a simple string like "hey" would become "$2a$10$yP.sXyWRLT1eJROwyRDNzufkPWW3g74CBtq/Q/ozQ6A6oZMUkstO6"

      since the hash string is very long, make sure the password column in the db can store at least 100 characters!
    */
    const hashedPassword = await hash(password, 10);
    const [{insertId: userId}] = await sql.execute('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email]);
    return userId;
}

export async function login(username: string, password: string): Promise<number | null> {
    const [users] = await sql.execute('SELECT id, password FROM users WHERE username = ?', [username]);
    if (users.length === 0) {
        return null;
    }
    
    // since we don't store the password in db in plain text, 
    // we use a special method, bcrypt.compare, to compare the password in the login to the hashed password in db
    const {id, password: hashedPasswordInDb} = users[0];
    const isPasswordCorrect = await compare(password, hashedPasswordInDb);
    
    if (!isPasswordCorrect) {
        return null;
    }

    return id;    
}