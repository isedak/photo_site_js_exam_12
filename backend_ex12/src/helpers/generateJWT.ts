import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

export const generateJWT = (payload: {[key: string]: string | number | boolean | ObjectId}) => {
    return jwt.sign(payload, process.env.SECRET_KEY || '', {expiresIn: '1h'})
};