import * as bcrypt from 'bcrypt'

import userService from "../services/userService.js";
import tokenService from '../services/tokenService.js';
import UserDto from '../dtos/userDto.js';


const parseHost = (host) => {
    if (!host) return 'no-host-name-in-http-headers';
    const portOffset = host.indexOf(':');
    if (portOffset > -1) host = host.substr(0, portOffset);
    return host;
  };

class UserController{
    async registration(req, res) {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });
        
        req.on('end', async () => {
            try {
              const {name, email, password, role} = JSON.parse(body);
              const saltRounds = 10;
              const hashedPassword = await bcrypt.hash(password, saltRounds)
              const newUser  = await userService.createUser(name, email, role,  hashedPassword);
        
              res.writeHead(200, {'Content-Type': 'application/json'});
              res.end(JSON.stringify({ message: 'Accoint was created' }));

            } catch (error) {
              res.writeHead(400, {'Content-Type': 'application/json'});
              res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });

          req.on('error', (err) => {
            console.error('Request error:', err);
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ error: 'Internal server error' }));
          });
    }

    async login (req, res) {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        })

        req.on('end', async () => {
            const {email, password} = JSON.parse(body);
            const user = await userService.findUserByEmail(email);

            if(user){
                const match = await bcrypt.compare(password, user.password);
                if(match){
                    const {accessToken, refreshToken} = tokenService.generateTokens(user.id, user.email, user.role);
                    await tokenService.saveOrUpdateToken(refreshToken, user.id)
                    const expires = `expires=${process.env.COOKIE_EXPIRE}`;
                    const host = parseHost(req.headers.host)
                    let cookie = `refresh=${refreshToken}; ${expires}; Path=/; Domain=${host}; HttpOnly`

                    const userDto = new UserDto(user);

                    res.writeHead(200, {'Content-Type': 'application/json', 'Set-Cookie': cookie});
                    res.end(JSON.stringify({userDto,  accessToken}));
                }
            }else{
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Auth error' }));
    
            }
           
        })
    }

    async getUsers (req, res){
        const users = await userService.getUsers();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(users))
    }

    async getUserById(req, res, par){
        const user = await userService.findUserById(par[0]);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(user))
    }
}

export default new UserController();