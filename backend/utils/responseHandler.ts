import { Response } from "express";

type apiResponse = {
    success: boolean,
    data?: any, 
    message?: string, 
    error?: any,
    field?: string
}

export function sendSuccess(res: Response, statusCode: number, data?: any, message = "Success"){
    const response : apiResponse = {
        success: true,
        data,
        message,
    }
    return res.status(statusCode).json(response);
}

export function sendError(res: Response, statusCode: number, message: string, error: any = null, field?: string){    
    const response : apiResponse = {
        success: false, 
        message, 
        error,
        field
    }
    return res.status(statusCode).json(response)
}