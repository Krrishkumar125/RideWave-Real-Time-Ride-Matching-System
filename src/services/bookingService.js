const BookingRepository = require('../repository/bookingRepository');
const LocationService = require('./locationService');
const haversineDistance = require('../utils/distance');

const BASIC_FARE = process.env.BASIC_FARE;
const RATE_PER_KM = process.env.RATE_PER_KM;

class BookingService{
    constructor(){
        this.bookingRepository = new BookingRepository();
        this.locationService = new LocationService();
    }

    async createBooking({passengerId , source ,destination}){
        
        const distance = haversineDistance(source.latitude , source.longitude, destination.latitude ,destination.longitude);;
        const fare = BASIC_FARE + (distance * RATE_PER_KM);
        const bookingData ={
            passenger : passengerId,
            source ,
            destination,
            fare,
            status : 'pending'
        };
        const booking = await this.bookingRepository.createBooking(bookingData);
        return booking;
    };

    async nearbyDrivers(source , radius=50){
        const latitude = parseFloat(source.latitude);
        const longitude = parseFloat(source.longitude);

        const radiusKm = parseFloat(radius);

        if(isNaN(latitude) || isNaN(longitude) || isNaN(radiusKm)){
            throw new Error('Invalid coordinates or radius');
        }

        const nearbyDrivers = await this.locationService.findNearbyDrivers(latitude, longitude ,radiusKm);
        return nearbyDrivers;
    }

    async assignDriver(bookingId,driverId){
        const booking = await this.bookingRepository.updateBookingStatus(bookingId , driverId ,'confirmed');
        if(!booking) throw new Error('booking already confirmed or does not exist');
        return booking;
    }
}

module.exports = BookingService;