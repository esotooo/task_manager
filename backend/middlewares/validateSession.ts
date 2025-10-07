import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { sendError } from "../utils/responseHandler";
import dotenv from 'dotenv';

dotenv.config();

export const validateSession = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) return sendError(res, 401, "No autenticado");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            id_user: string;
            email: string;
            firstname: string;
            lastname: string;
            username: string;
        };

        (req as any).user = decoded;
        next();
    } catch {
        return sendError(res, 401, "Token inválido");
    }
};
