const BookingRepository = require('../repository/bookingRepository');

class PassengerService{
    constructor(){
        this.bookingRepository = new BookingRepository();
    }

    async getPassengerBookings(passengerId){
         try {
            const bookings = await this.bookingRepository.getPassengerBookings(passengerId);
            if(!bookings) throw new Error('No past bookings available of the user');
            return bookings;
         } catch (error) {
            console.log('something went wrong in passenger service' , error);
         }
    }

    async provideFeedback(passengerId , bookingId , rating , feedback){
        try {
           const booking = await this.bookingRepository.findBooking({_id:bookingId , passenger:passengerId});
           if(!booking) throw new Error('booking not found');
           booking.rating = rating;
           booking.feedback = feedback;
           await booking.save();
           return booking;
        } catch (error) {
           console.log('something went wrong in passenger service' , error);
        }
   }
}

module.exports = PassengerService;