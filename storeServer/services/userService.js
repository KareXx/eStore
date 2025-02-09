import pool from "../config/db.js";

class UserService{
    async createUser(name, email, role, password){
        try{
            const newUser = await pool.query('INSERT INTO users (name, email, role, password) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, role, password])
            return newUser.rows[0];
        }catch(error){
            console.log(error)
        }
    }

    async findUserByEmail(email){
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        return user.rows[0];
    }

    async findUserById(id){
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [id])
        return user.rows[0];
    }

    async getUsers(){
        const users = await pool.query('SELECT * FROM users');
        return users.rows;
    }

    
}

export default new UserService();