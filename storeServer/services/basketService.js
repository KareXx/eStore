import pool from "../config/db.js";

class BasketService{
    async createBasket(productId, quantity, orderId){
        const basket = await pool.query('INSERT INTO baskets (product_id, quantity, order_id) VALUES ($1, $2, $3) RETURNING *', [productId, quantity, orderId]);
        return basket.rows[0];
    }
}


export default new BasketService();