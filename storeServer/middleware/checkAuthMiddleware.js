import tokenService from "../services/tokenService.js";

const checkAuthMiddleware = (callback) => (req, res, par) => {
    const accessToken = req.headers.authorization?.split(' ')[1];
    const userData = tokenService.validateAccessToken(accessToken);
    if(!accessToken || !userData){
        res.writeHead(401, {'Content-Type': 'text/plain'});
        res.end('User is not auth');
        return;
    }
    callback(req, res, par, userData);

}

export default checkAuthMiddleware;