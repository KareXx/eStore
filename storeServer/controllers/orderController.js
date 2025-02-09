import tokenService from "../services/tokenService.js";
import orderService from "../services/orderService.js";
import basketService from "../services/basketService.js";

class OrderController{
    async handleOrder(req, res){
        let body = '';
        req.on('data', chunk => body += chunk);

        req.on('end', async () => {
            const data = JSON.parse(body)
            const accessToken = req.headers.authorization?.split(' ')[1];
            const userData = tokenService.validateAccessToken(accessToken);
            const userId = userData?.id || null;
            if(!userData && accessToken){
                res.writeHead(401, {'Content-Type': 'text/plain'});
                res.end('User is not auth');
                return;
            }
            if(!userData && !accessToken){
                const {name, phone} = data.contactInfo;
                var anonymousUser = await orderService.createAnonymousUser(name, phone);
            }
            const anonymousUserId = anonymousUser ? anonymousUser.id : null
            const order = await orderService.createOrder(6, userId, anonymousUserId);

            await Promise.all(data.baskets.map(async (basket) => {
                return await basketService.createBasket(basket.id, basket.quantity, order.id)
            }))
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(order));
        }) 
    }

    async getOrders(req, res, _, userData){
        const orders = await orderService.getOrders(userData.id);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(orders));
    } 
}

export default new OrderController();