const {redisClient} = require('../utils/redisClient');

class LocationService{

    async setDriverSocket(driverId,socketId){
        await redisClient.set(`driver:${driverId}`, socketId);
    }

    async getDriverSocket(driverId){
        return await redisClient.get(`driver:${driverId}`);
    }

    async deleteDriverSocket(driverId){
        await redisClient.del(`driver:${driverId}`);
    }

    async addDriverLocation(driverId, latitude ,longitude){
         
        try {
            await redisClient.sendCommand([
                'GEOADD',
                'drivers',
                latitude.toString(),
                longitude.toString(),
                driverId.toString()
            ]);
        } catch (error) {
            console.log('cannot add to redis' , error);
        }
    }

    async findNearbyDrivers(longitude , latitude ,radiusKm){
        const nearbyDrivers = await redisClient.sendCommand([
          'GEORADIUS',
          'drivers',
          longitude.toString(), 
          latitude.toString(),
          radiusKm.toString(),
          'km',
          'WITHCOORD'
        ]);
        return nearbyDrivers;
      }
      

    async storeNotifiedDrivers(bookingId , driverIds){       
        for(const driverId of driverIds){
            await redisClient.sAdd(`notifiedDrivers:${bookingId}`,driverId);
        }
    }

    async getNotifiedDrivers(bookingId){
        const notifiedDrivers = await redisClient.sMembers(`notifiedDrivers:${bookingId}`);
        return notifiedDrivers;
    }
}

module.exports = LocationService;