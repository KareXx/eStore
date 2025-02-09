import  url from 'url';
import multiparty  from 'multiparty'
import fs from 'fs'
import path from 'path'

import categoryService from "../services/categoryService.js";
import productService from "../services/productService.js";
import { saveFileToStatic } from '../scripts/fileSystem.js';


class ProductController{
    
    async createProduct(req, res){
        const __filename = url.fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const parentDir = path.join(__dirname, '..');
        const staticFolder = path.join(parentDir, 'static'); // Например, ./static

        var contentType = req.headers['content-type'];

        if (contentType && contentType.indexOf('multipart') === 0) {
            var form = new multiparty.Form();
            form.parse(req, async function(err, fields, files) {

                const { name, price, description, details, collection, categories} = fields;
                const {img, images} = files

               
                const mainImgPath = saveFileToStatic(img[0].path, staticFolder)
                const product = await productService.createProduct({name: name[0], price: parseFloat(price), description: description[0], details: details[0], collection:collection[0], img: mainImgPath})
                
                if(categories){
                    const categoriesParse = JSON.parse(categories)
                    await Promise.all(categoriesParse.map(category => productService.addProductCategory(product.id, category.id)))
                }
                if(images){
                    const imagesPathList = images.map(img => saveFileToStatic(img.path, staticFolder));
                    await Promise.all(imagesPathList.map(imgPath => productService.createProductImage(product.id, imgPath)))
                }
                
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(product));

            if (!err) {
            }
            });
        }
    
        

    }

    async deleteProducts(req, res){
        let body = '';

        req.on('data', chunk => {
            body += chunk
        })

        req.on('end', async() => {
            const productsId = JSON.parse(body);
            const deletedRows = await productService.deleteProducts(productsId);

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(deletedRows))

        })
    }

    async getProduct(req, res, par){
        const product = await productService.getProductById(par[0]);
        console.dir(product)
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(JSON.stringify(product))
    }
    
    async getProductsById(req, res){
        const {from, to} = url.parse(req.url, true).query;
        const {name, id} = url.parse(req.url, true).query
        let productList;
        if(from && to){
            productList = await productService.getProducts(from, to);
        }else if(name || id){
            productList = await productService.getProductsByPattern(name)
        }
        else{
            productList = await productService.getAllProducts();
        }
        
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'X-Total-Count': productList.length
            });
        res.end(JSON.stringify(productList));
    }

    async getProductsByCategory(req, res){
        
    }

    async getProductsPriceRange(req, res){
        const priceRange = await productService.getProductsPriceRange();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(priceRange)); 
    }

    async addProductCategory(req, res){
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        })

        req.on('end', async () => {
            const {productID, categoryID} = JSON.parse(body);
            const productCategoryLink = await productService.addProductCategory(productID, categoryID);

            res.writeHead(200, {'Content-Type': 'application/json',})
            res.end(JSON.stringify(productCategoryLink))
        })
    }

    //Product__Images
    async createProductImage(req, res){
        let body = '';

        req.on('data', (chunk) => {
            body += chunk
        })

        req.on('end', async () => {
            const {productID, url} = JSON.parse(body);

            const image = await productService.createProductImage(productID, url);
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify(image));
        })
    }

    async changeProductFields(req, res){
        let body = ''
        req.on('data', chunk => {
            body += chunk
        })

        req.on('end', () => {
            const { id, categories, ...fieldsToUpdate } = JSON.parse(body)

            if(Object.keys(fieldsToUpdate) === 0) {
                
                res.writeHead(200, {'Content-Type': 'text/plain'})
                res.end('No fields to change');
                return
            }

            const updatedProduct = productService.changeProductFields(id, fieldsToUpdate);
            res.writeHead(200, {'Content-Type': 'text/plain'})
            res.end('Product has been successfully updated')
            
        })
    }
}

export default new ProductController();