import 'dotenv/config'
import jwt from 'jsonwebtoken'

import pool from "../config/db.js";

import UserDto from '../dtos/userDto.js';
import userService from './userService.js';



class TockenService{
    generateTokens(id, email, role){
        const accessToken = jwt.sign({id, email, role}, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refreshToken = jwt.sign({id, email, role}, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            accessToken,
            refreshToken
        }
    } 

    validateAccessToken(token){
        try{
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData
        }catch(error){
            return null;
        }
    }

    validateRefreshToken(token){
        try{
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData
        }catch(error){
            return null;
        }
    }

    async saveOrUpdateToken(token, userId){
        const tokenData = await  pool.query('INSERT INTO refresh_tokens (token, userid) VALUES ($1, $2) ON CONFLICT (userid) DO UPDATE SET token = $1', [token, userId]);
        return tokenData;
    }

    async getTokenByUserId(userId){
        const tokenData = await  pool.query('SELECT DISTINCT * FROM refresh_tokens WHERE userid=$1', [id])
        return tokenData.rows[0]
    }

    async getTokenByValue(refreshToken){
        const tokenData = await  pool.query('SELECT DISTINCT * FROM refresh_tokens WHERE token=$1', [refreshToken])
        return tokenData.rows[0]
    }

    async refresh(refreshToken){
        try{
            if(!refreshToken){
                throw new Error('refres is undefind');
            }
    
            const userData = this.validateRefreshToken(refreshToken);
            const tokenFromDB = this.getTokenByValue(refreshToken);
    
            if(!userData || !tokenFromDB ){
                throw new Error('refres is undefind');
            }
            const user = await userService.findUserById(userData.id)

            const userDto = new UserDto(user)
            const tokens =  this.generateTokens(user.id, user.email, user.role);
            await this.saveOrUpdateToken(tokens.refreshToken, user.id);
            return {...tokens, userDto }
        }catch(error){
            return null
        }
       
    }
}

export default new TockenService();