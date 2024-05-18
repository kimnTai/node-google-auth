import createHttpError from 'http-errors';
import jsonWebToken, { type JwtPayload } from 'jsonwebtoken';

export const generateToken = (payload: { userId?: string }) => {
    return jsonWebToken.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_DAY
    });
};

export const verifyToken = (token: string) => {
    try {
        return jsonWebToken.verify(token, process.env.JWT_SECRET) as JwtPayload;
    } catch (error) {
        throw createHttpError(403, '請重新登入');
    }
};
