import pool from "../config/db.js";


class CategoryService {
    async createCategory(name, slug){
        const newCategory = await pool.query('INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING *', [name, slug]);
        return newCategory.rows[0];
    }
    async getAllCategories(){
        const categories = await pool.query('SELECT * FROM categories');
        return categories.rows;
    }

    async getCategoryById(id){
        const category = await pool.query('SELECT * FROM categories WHERE id = $1', [id])
        return category.rows[0]
    }
}

export default new CategoryService();