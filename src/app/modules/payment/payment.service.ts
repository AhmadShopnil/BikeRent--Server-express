import httpStatus from "http-status";
import { TBooking } from "../booking/booking.interface";
import { TUserJwtPayload } from "../user/user.interface";
import { sslServices } from "../ssl/ssl.service";
import { Bike } from "../bike/bike.model";
import { generateTransactionId } from "./payment.utils";
import AppError from "../../errors/AppError";
import { Booking } from "../booking/booking.model";


const initPayment = async ({
    bookingData,
    user,
  }: {
    bookingData: TBooking;
    user: TUserJwtPayload;
  }) => {

    const transactionId: string = generateTransactionId(user?.userId);

    const wishToRentBike = await Bike.findById({ _id: bookingData?.bikeId });
    if (wishToRentBike?.isAvailable === false) {
      throw new AppError(httpStatus.NOT_FOUND, 'Bike is not available for rent');
    }
  
    // Task-1
  
    /// change bike available status after return the bike
    const rentedBike = await Bike.findByIdAndUpdate(
      { _id: bookingData?.bikeId },
      { isAvailable: false },
    );
    if (!rentedBike) {
      throw new AppError(httpStatus.NOT_FOUND, 'Bike not found for booking');
    }
  
    const modiFiedBookingData = { ...bookingData };
    modiFiedBookingData.transactionId = transactionId;
    modiFiedBookingData.isAdvanced = false;

    modiFiedBookingData.userId = user?.userId;
  
     await Booking.create(modiFiedBookingData);
  

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



const paymentSuccessService = async ({tran_id}:{tran_id:string}) => {
  
    // const { tran_id } = payload;
    const updatedetBookingStatus = await Booking.findOneAndUpdate({ transactionId: tran_id },
        { isAdvanced: true },
    );

    if (!updatedetBookingStatus) {
        throw new AppError(httpStatus.NOT_FOUND, 'payment faild for this booking');
      }
   
      const successRedirectUrl=`https://front-end-bike-rent.vercel.app/dashboard/user/bookingConfirmation/${tran_id}`

    return {
       success:true,
       successRedirectUrl
    };


}


const paymentFailedService = async ({tran_id}:{tran_id:string}) => {
  

  console.log('from service',tran_id)
  // const { tran_id } = payload;



  const deletedFailedBooking = await Booking.findOneAndDelete({ transactionId: tran_id});

// mkae bike status re available because of payment fail
 if(deletedFailedBooking?.bikeId){
  await Bike.findByIdAndUpdate(
    { _id: deletedFailedBooking?.bikeId },
    { isAvailable: true },
  );
 }




  

    const failedRedirectUrl=`https://front-end-bike-rent.vercel.app/dashboard/user/bookingFailed`

  return {
     failed:true,
     failedRedirectUrl
  };


}




const validate = async (payload: any) => {
   
  if (!payload || !payload?.status || payload?.status !== 'VALID') {

    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Payment!');

        // return {
        //     massage: 'Invalid Payment!'
        // }
    }
    const result = await sslServices.validate(payload);

    if (result?.status !== 'VALID') {
        return {
            massage: 'Payment failed'
        }
    }
    const { tran_id } = result;

  

    // const { tran_id } = payload;


    const updatedetBookingStatus = await Booking.findOneAndUpdate({ transactionId: tran_id },
        { isPaid: true },
    );



    if (!updatedetBookingStatus) {
        throw new AppError(httpStatus.NOT_FOUND, 'payment faild for this booking');
      }
   
   
    return {
        massage: 'Payment Successfull complete'
    };


    

}




export const PaymentService = {
    initPayment,
    validate,
    paymentSuccessService,
    paymentFailedService,
}