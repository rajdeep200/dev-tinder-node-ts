import { NextFunction, Request, Response } from "express";
import { ResponseBody } from "../classes/ErrorResponse";
import { ERROR_MESSAGES } from "../utils/constants";
import { JwtAuth } from "../utils/utils";
import { getUserById } from "../services/userService";
import { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
    user: string | JwtPayload;
}

export const mwJwtAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Read the token
    try {
        const token = req.headers.authorization?.split(" ")[1];
    if(!token) {
        res.status(401).json(new ResponseBody(false, ERROR_MESSAGES.INVALID_TOKEN))
        return;
    }

    // Validate token
    const decodedValue: any = await new JwtAuth().verifyToken(token)
    if(!decodedValue) {
        res.status(401).json(new ResponseBody(false, ERROR_MESSAGES.INVALID_TOKEN))
        return;
    }

    // Find the user
    const userObj = await getUserById(decodedValue?.userId)
    console.log('userObj :: ', userObj)
    if(!userObj) {
        res.status(401).json(new ResponseBody(false, ERROR_MESSAGES.USER_NOT_FOUND))
        return;
    }

    (req as CustomRequest).user = userObj;

    next();
    } catch (error) {
        res.status(500).json(new ResponseBody(false, ERROR_MESSAGES.SOMETHING_WENT_WRONG))
    }
}