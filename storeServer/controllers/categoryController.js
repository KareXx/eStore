import categoryService from "../services/categoryService.js";

class CategoryController{
    async createCategory(req, res){
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        })

        req.on('end', async () => {
            const {name, slug} = JSON.parse(body);
            const category = await categoryService.createCategory(name, slug);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(category))
        })
    }

    async getAllCategories(req, res){
        const categories = await categoryService.getAllCategories();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(categories))
    }

    async getCategory(req, res, par){
        const category = await categoryService.getCategoryById(par[0]);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(category));

    }
}

export default new CategoryController();