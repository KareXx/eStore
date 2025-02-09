import pool from "../config/db.js";

class OrderService{
    async createOrder(statusId, userId = null, anonymousUserId = null){
        if (!userId && !anonymousUserId) {
            throw new Error('Необходимо передать либо userId, либо anonymousUserId');
        }
        const order = await pool.query('INSERT INTO orders (user_id, anonymous_user_id, status_id) VALUES ($1, $2, $3) RETURNING *', [userId, anonymousUserId, statusId]);
        return order.rows[0];
    }

    async createAnonymousUser (name, phone){
        const anonymousUser = await pool.query('INSERT INTO anonymous_users (name, phone) VALUES ($1, $2) RETURNING *', [name, phone]);
        return anonymousUser.rows[0]
    } 

    async getOrders (userId){
        const orders = await pool.query('SELECT * FROM orders WHERE user_id=$1', [userId]);
        return orders.rows;
    }
}

export default new OrderService();