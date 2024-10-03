import httpStatus from "http-status";
import { TBooking } from "../booking/booking.interface";
import { TUserJwtPayload } from "../user/user.interface";
import { sslServices } from "../ssl/ssl.service";
import { Bike } from "../bike/bike.model";
import { generateTransactionId } from "./payment.utils";
import AppError from "../../errors/AppError";


const initPayment = async ({
    bookingData,
    user,
  }: {
    bookingData: TBooking;
    user: TUserJwtPayload;
  }) => {

    // const wishToRentBike = await Bike.findById({ _id: bookingData?.bikeId });

    const transactionId: string = generateTransactionId(user?.userId);


    const paymentSession = await sslServices.initPayment({
        amount: 100,
        transactionId: transactionId,
        customerName: "N/A",
        customerEmail: user?.email
    })




    return {
        paymentUrl: paymentSession.GatewayPageURL
    };
};

const validate = async (payload: any) => {
   

  if (!payload || !payload?.status || payload?.status !== 'VALID') {

    // throw new AppError(httpStatus.NOT_FOUND, 'Invalid Payment!');

        return {
            massage: 'Invalid Payment!'
        }
    }
    const result = await sslServices.validate(payload);

    if (result?.status !== 'VALID') {
        return {
            massage: 'Payment failed'
        }
    }
    const { tran_id } = result;

    // Uncomment when validate in locally
    // const { tran_id } = payload;





    return {
        massage: 'Payment Success'
    };


    

}

export const PaymentService = {
    initPayment,
    validate
}