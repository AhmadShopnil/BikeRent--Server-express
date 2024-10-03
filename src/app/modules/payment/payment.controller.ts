import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { PaymentService } from "./payment.service";
import sendResponse from "../../shared/sendResponse";
import { TUserJwtPayload } from "../user/user.interface";
import { CustomRequest } from "../../interface/CustomRequest";



const initPayment = async ( req: CustomRequest,
    res: Response,
    next: NextFunction,) => {
    const bookingData = req.body;
    const user = req.user as TUserJwtPayload;
    const result = await PaymentService.initPayment({bookingData,user})
    //res.redirect(result.paymentUrl)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment init successfully",
        data: result
    })
};

const validate = async (req: Request, res: Response, next: NextFunction) => {
    const result = await PaymentService.validate(req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment verified!",
        data: result
    })
}

export const PaymentController = {
    initPayment,
    validate
};