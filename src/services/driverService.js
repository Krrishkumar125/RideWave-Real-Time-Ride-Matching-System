const BookingRepository = require('../repository/bookingRepository');
const LocationService = require('./locationService');
const driverRepository = require('../repository/driverRepostory');

class DriverService{
    constructor(){
        this.bookingRepository = new BookingRepository();
        this.locationService = new LocationService();
    }

    async getBookings(driverId){
      try {
        const bookings = await this.bookingRepository.getDriverBookings(driverId);
        if(!bookings) throw new Error('No booking available of the driver');
        return bookings;
      } catch (error) {
        console.log(error);
      }
    }

    async updateLocation(driverId , latitude , longitude){
        const lat = parseFloat(latitude);
        const long = parseFloat(longitude);

        if(isNaN(latitude) || isNaN(longitude)){
            throw new Error('Invalid coordinates or radius');
        }

        await this.locationService.addDriverLocation(driverId , lat , long);

        await driverRepository.updateDriverLocation(driverId,{
            type : 'Point',
            coordinates : [lat , long]
        });
    }
}

module.exports = DriverService;