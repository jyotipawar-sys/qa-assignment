// authMiddleware.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import userRepository from '../repositories/user.repository';
import { config } from "../config/db.config";

const secretKey = config.secretKey

interface CustomJwtPayload extends JwtPayload {
    username: string;
    password: string;
}

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }

    jwt.verify(token, secretKey, async (err, decoded) => {
        const userPayload = decoded as CustomJwtPayload
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        /// get user 
        req.user = await userRepository.retrieveByEmail(userPayload?.username)
        next();
    });
}
