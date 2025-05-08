const {StatusCodes} = require('http-status-codes')

const {PassengerService} = require('../services/index');

const passengerService = new PassengerService();

const getPassengerBookings = async (req ,res) =>{
    try {
        const bookings = await passengerService.getPassengerBookings(req.user._id);
        return res.status(StatusCodes.OK).json({
            data: bookings,
            success: true,
            message : 'All the past bookings of the passenger are fetched',
            err : null
        })
    } catch (error) {
        console.log('Something went wrong in passenger controller', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data:[],
            success: false,
            message : 'Something went wrong',
            err : error
        })
    }
}

const provideFeedback = async (req ,res) =>{
    try {
        const {bookingId , rating , feedback} = req.body;
        const booking = await passengerService.provideFeedback(req.user._id , bookingId , rating , feedback);
        return res.status(StatusCodes.CREATED).json({
            data : booking,
            success : true,
            message : 'Succesfully submitted the feedback',
            error : null
        })
    } catch (error) {
        console.log('Something went wrong in passenger controller', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data:[],
            success: false,
            message : 'Something went wrong',
            err : error
        })
    }
}

module.exports ={
    getPassengerBookings,
    provideFeedback
}