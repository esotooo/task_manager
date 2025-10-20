import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/responseHandler';

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return sendError(res, 403, "Acceso denegado. No se ha proporcionado un token válido.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');

    (req as any).user = decoded;

    next();

  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return sendError(res, 401, "El token ha expirado. Por favor inicia sesión nuevamente.");
    }

    return sendError(res, 401, "Token inválido o corrupto.");
  }
};
