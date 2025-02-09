import pool from "../config/db.js";

class ProductService{
    async createProduct(product){
        const newProduct = await pool.query('INSERT INTO products (name, price, description, img, details, collection) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [product.name, product.price, product.description, product.img, product.details, product.collection]);
        return newProduct.rows[0];
    }

    async deleteProducts(products){
        const setClause = products.map((_, index) => `$${index + 1}`).join(', ')
        const deletedRows = await pool.query(`DELETE FROM products WHERE id IN (${setClause})`, products)
        return deletedRows
    }

    async getProductById(id){
        

        const product = await pool.query(`
            SELECT products.*, 
                (
                    SELECT JSON_AGG(json_build_object('id', categories.id, 'name', categories.name))
                    FROM product_categories
                    JOIN categories ON product_categories.category_id = categories.id
                    WHERE product_categories.product_id = products.id
                ) AS categories,
                (
                    SELECT JSON_AGG(product_images.image_url)
                    FROM product_images
                    WHERE product_images.product_id = products.id
                ) AS images
                FROM products
                WHERE products.id = $1;
        `, [id]) 
        return product.rows[0];
    }

    async getProducts(from, to){
        const products = await pool.query('SELECT * FROM products WHERE id BETWEEN $1 AND $2', [from, to]);
        return products.rows
    }

    async getAllProducts(){
        // const products = await pool.query('SELECT * FROM products');

        const products = await pool.query(`
            SELECT products.*, 
                (
                    SELECT JSON_AGG(json_build_object('id', categories.id, 'name', categories.name))
                    FROM product_categories
                    JOIN categories ON product_categories.category_id = categories.id
                    WHERE product_categories.product_id = products.id
                ) AS categories,
                (
                    SELECT JSON_AGG(product_images.image_url)
                    FROM product_images
                    WHERE product_images.product_id = products.id
                ) AS images
                FROM products;
        `) 
        return products.rows
    }
    
    async getProductsByPattern(value){
        const pattern = '%'+value+'%'
        const products = await pool.query('SELECT * FROM products WHERE name ILIKE $1', [pattern])
        return products.rows
    }

    async getProductsPriceRange(){
        const priceRange = await pool.query('SELECT MAX(price), MIN(price) FROM products');
        return priceRange.rows[0]
    }


    async addProductCategory(productID, categoryID){
        const productCategoryLink = await pool.query('INSERT INTO product_categories (product_id, category_id) VALUES ($1,$2) RETURNING *', [productID, categoryID]);
        return productCategoryLink.rows[0];
    }


    async createProductImage(productID, url){
        const newProduct = await pool.query('INSERT INTO product_images (product_id, image_url) VALUES ($1,$2) RETURNING *', [productID, url]);
        return newProduct.rows[0];

    }

    async changeProductFields(id, fieldsToUpdate){
            const keys = Object.keys(fieldsToUpdate);
            const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");

            const values = Object.values(fieldsToUpdate)
            values.push(id)
            const query = `UPDATE products SET ${setClause} WHERE id = $${values.length} RETURNING *`
            const updateProduct = await pool.query(query, values)
            return updateProduct.rows[0]

    }
   
}

export default new ProductService();