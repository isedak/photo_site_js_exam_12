import { NextFunction, Request, Response } from "express";
import { EStatuses } from "../enums/EStatuses";
import IResponse from "../interfaces/IResponse";
import jwt from "jsonwebtoken";
import IRequestWithTokenData from "../interfaces/IRequestWithTokenData";

export const auth = (expressReq: Request, res: Response, next: NextFunction) => {
    const req = expressReq as IRequestWithTokenData
    if (req.method === 'OPTIONS') {
        next();
    };
    try {
        const data = jwt.verify(req.get('Authorization') || '', process.env.SECRET_KEY || '');
        if (data) {
            req.dataFromToken = data;
            next();
        } else {
            const response: IResponse<undefined> = {
                status: EStatuses.NOT_OK,
                result: undefined,
                message: 'Not authorized'
            }
            res.status(200).send(response);
        };
    } catch {
        const response: IResponse<undefined> = {
            status: EStatuses.NOT_OK,
            result: undefined,
            message: 'Not authorized'
        };
        res.status(200).send(response);
    };
};