const { StatusCodes } = require('http-status-codes');

const {BookingService} = require('../services/index');
const LocationService = require('../services/locationService');

const bookingService = new BookingService();
const locationService = new LocationService();

const createBooking = (io) => async (req,res) =>{
    try {
        const {source , destination} = req.body;
        const booking = await bookingService.createBooking({passengerId : req.user._id, source ,destination});
        
        const nearbyDrivers = await bookingService.nearbyDrivers(source);
        console.log("Nearby drivers:", nearbyDrivers); //testcase
        const driverIds =[];
        for(const driver of nearbyDrivers){
            const driverSocketId = await locationService.getDriverSocket(driver[0]);
            console.log(`Driver ID: ${driver[0]}, Socket ID: ${driverSocketId}`);
            if(driverSocketId){
                driverIds.push(driver[0]);
                io.to(driverSocketId).emit('newBooking', {bookingId : booking._id , source , destination , fare : booking.fare});
            }
        }

        await locationService.storeNotifiedDrivers(booking._id , driverIds);
        return res.status(StatusCodes.CREATED).json({
            data : booking,
            success: true,
            error : null ,
            message: 'Successfully created booking'
        })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data:null,
            message : 'Unable to create a booking',
            err : error,
            success:false
        })
    }
}

const confirmBooking = (io) => async(req,res) =>{
      try {
        const {bookingId} = req.body;

        const booking = await bookingService.assignDriver(bookingId, req.user._id);

        const notifiedDriverIds = await locationService.getNotifiedDrivers(bookingId);

        for(const driverId of notifiedDriverIds){
            const driverSocketId = await locationService.getDriverSocket(driverId);

            if(driverSocketId){
                if(driverId == req.user._id){
                    io.to(driverSocketId).emit('rideConfirmed', {bookingId , driverId: req.user._id});
                }else{
                    io.to(driverSocketId).emit('removeBooking' , {bookingId});
                }
            }
        }

        return res.status(StatusCodes.CREATED).json({
            data : booking,
            success: true,
            error : null ,
            message: 'Successfully confirmed booking'
        })
      } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data:null,
            message : 'Unable to confirm the booking',
            err : error,
            success:false
        })
      }
}

module.exports = {
    createBooking,
    confirmBooking
}