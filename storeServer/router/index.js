import Router from "./Router.js";
import checkAuthMiddleware from "../middleware/checkAuthMiddleware.js";

import UserController from "../controllers/userController.js";
import productController from "../controllers/productController.js";
import categoryController from "../controllers/categoryController.js";
import tokenController from "../controllers/tokenController.js";
import orderController from "../controllers/orderController.js";
import userController from "../controllers/userController.js";



const router = new Router();

router.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({id: 1}))
})


router.get('/products', productController.getProductsById)
router.get('/products/price', productController.getProductsPriceRange)
router.get('/products/*', productController.getProduct)
router.post('/products', productController.createProduct)
router.post('/products/image', productController.createProductImage)
router.post('/products/category', productController.addProductCategory)
router.delete('/products', productController.deleteProducts)
router.patch('/products', productController.changeProductFields)

router.get('/order', checkAuthMiddleware(orderController.getOrders))
router.post('/order', orderController.handleOrder)

router.get('/category', categoryController.getAllCategories)
router.get('/category/*', categoryController.getCategory)

router.post('/category', categoryController.createCategory)


router.post('/login', UserController.login)
router.post('/registration', UserController.registration)

router.get('/refresh', tokenController.refresh)

router.get('/users', userController.getUsers);
router.get('/users/*', checkAuthMiddleware(userController.getUserById));

export default router;