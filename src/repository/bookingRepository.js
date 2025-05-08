const Booking = require('../models/booking');

class BookingRepository{
    async getPassengerBookings(passengerId){
        try {
            const Bookings = await Booking.find({
                passengerId,
                role : 'passenger'
            })
            return Bookings;
        } catch (error) {
            console.log('Something went wrong in booking repo' , error);
        }
    }

    async findBooking(bookingId , passengerId){
        try {
            const booking = await Booking.find({
                _id : bookingId,
                passengerId
            });
            return booking;
        } catch (error) {
            console.log('Something went wrong in booking repo' , error);
        }
    }

    async createBooking(bookingData){
        const booking = new Booking(bookingData);
        await booking.save();
        return booking;
    }

    async updateBookingStatus(bookingId , driverId , status){
         const booking = await Booking.findById(bookingId);
         booking.status = status;
         booking.driverId = driverId;
         await booking.save();
         return booking;
    }

    async getDriverBookings(driverId){
        try {
            const Bookings = await Booking.find({
                passengerId : driverId,
                role : 'driver'
            })
            return Bookings;
        } catch (error) {
            console.log('Something went wrong in booking repo' , error);
        }
    }
}

module.exports = BookingRepository;