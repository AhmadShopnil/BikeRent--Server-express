import axios from "axios"

import { PaymentInfo } from "./ssl.interface";

import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";

const initPayment = async (paymentData: PaymentInfo) => {
    try {
        const data = {
            store_id: config.ssl.storeId,
            store_passwd: config.ssl.storePass,
            total_amount: paymentData.amount,
            currency: 'BDT',
            tran_id: paymentData.transactionId,
            success_url: `https://server-bike-rent.vercel.app/api/payment/success/${paymentData?.transactionId}`,
            fail_url:`https://server-bike-rent.vercel.app/api/payment/failed/${paymentData?.transactionId}`,
            cancel_url: config.ssl.cancelUrl,
            ipn_url: 'https://server-bike-rent.vercel.app/api/payment/ipn',
            shipping_method: 'N/A',
            product_name: 'Bike Rent',
            product_category: 'Rent',
            product_profile: 'general',
            cus_name: paymentData.customerName,
            cus_email: paymentData.customerEmail,
            cus_add1: "address",
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: "N/A",
            cus_fax: 'N/A',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
        const response = await axios({
            method: 'post',
            url: config.ssl.sslPaymentUrl,
            data: data,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        return response.data
    }
    catch (err) {
        throw new AppError(httpStatus.BAD_REQUEST, "Payment error")
    }
};

const validate = async (data: any) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${config.ssl.validationUrl}?val_id=${data.val_id}&store_id=${config.ssl.storeId}&store_passwd=${config.ssl.storePass}&format=json`
        })
        return response.data;
    }
    catch (err) {
        throw new AppError(httpStatus.BAD_REQUEST, "Payment error")
    }
}

export const sslServices = {
    initPayment,
    validate
}