import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { PaymentService } from "./payment.service";
import sendResponse from "../../shared/sendResponse";
import { TUserJwtPayload } from "../user/user.interface";
import { CustomRequest } from "../../interface/CustomRequest";



const initPayment = async ( req: CustomRequest,
    res: Response,
    next: NextFunction,) => {
try {
    
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

} catch (error) {
    next(error);
}

   
};

const paymentSuccess = async ( req: CustomRequest,
    res: Response,
    next: NextFunction,) => {
try {
    
    const { tran_id} = req.params;



    const result = await PaymentService.paymentSuccessService({tran_id})

    if (result.success){
    res.redirect(result.successRedirectUrl)
     }

    // sendResponse(res, {
    //     success: true,
    //     statusCode: httpStatus.OK,
    //     message: "Payment init successfully",
    //     data: result
    // })

} catch (error) {
    next(error);
}

   
};

const paymentFailed = async ( req: CustomRequest,
    res: Response,
    next: NextFunction,) => {
try {
    
    const { tran_id} = req.params;
    const result = await PaymentService.paymentFailedService({tran_id})

    if (result.failed){
    res.redirect(result.failedRedirectUrl)
     }

    // sendResponse(res, {
    //     success: true,
    //     statusCode: httpStatus.OK,
    //     message: "Payment init successfully",
    //     data: result
    // })

} catch (error) {
    next(error);
}

   
};


const validate = async (req: Request, res: Response, next: NextFunction) => {

try {
    const result = await PaymentService.validate(req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment verified !",
        data: result
    })
} catch (error) {
    next(error);
}

    
}

export const PaymentController = {
    initPayment,
    validate,
    paymentSuccess,
    paymentFailed,
};