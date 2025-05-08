const { StatusCodes } = require("http-status-codes");

const {DriverService} = require("../services/index");

const driverService = new DriverService();

const updateLocation = async (req, res) => {
  try {
     const {latitude , longitude} = req.body;
     await driverService.updateLocation(req.user._id , latitude ,longitude);
     
     return res.status(StatusCodes.OK).json({
        success: true,
        error : null , 
        message :'Succesfully updated the location'
     });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: null,
      message: "Unable to update the drivers location",
      err: error,
      success: false,
    });
  }
};

const getDriverBookings = async (req, res) => {
    try {
       const bookings =await driverService.getBookings(req.user._id);
       
       return res.status(StatusCodes.OK).json({
          data : bookings,
          success: true,
          error : null , 
          message :'Succesfully fetched the bookings'
       });
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        data: null,
        message: "Unable to fetch the drivers bookings",
        err: error,
        success: false,
      });
    }
  };

module.exports = {
  updateLocation,
  getDriverBookings
};
