import tokenService from "../services/tokenService.js";



class TokenController{
    async refresh(req, res){
        try{
            const cookies = {}
            const {cookie} = req.headers;
            if(!cookie) throw new Error();
            const items = cookie.split(';');

            for (const item of items) { 
                const parts = item.split('=');
                const key = parts[0].trim();
                const val = parts[1] || '';
                cookies[key] = val.trim();
            }
            const {refreshToken, ...sendingData} = await tokenService.refresh(cookies.refresh);

            const expires = `expires=${process.env.COOKIE_EXPIRE}`;
            const host = req.headers.host.split(':')[0]
            let setCookie = `refresh=${refreshToken}; ${expires}; Path=/; Domain=${host}; HttpOnly`
            res.writeHead(200, {'Content-Type': 'application/json', 'Set-Cookie': setCookie});
            res.end(JSON.stringify(sendingData));

        }catch(error){
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Auth error' }));
        }
    }
    
}

export default new TokenController();