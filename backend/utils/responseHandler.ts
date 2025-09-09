import { Response } from "express";

type apiResponse = {
    success: boolean,
    data?: any, 
    message: string, 
    error?: any,
    token?: any | null
}

export function sendSucess(res: Response, statusCode: number, data?: any, message = "Sucess", token?: any){
    const response : apiResponse = {
        success: true,
        data,
        message,
        token
    }
    return res.status(statusCode).json(response);
}

export function sendError(res: Response, statusCode: number, message: string, error: any = null){    
    const response : apiResponse = {
        success: false, 
        message, 
        error
    }
    return res.status(statusCode).json(response)
}