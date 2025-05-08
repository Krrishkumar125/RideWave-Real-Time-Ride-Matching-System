const User = require('../models/user');

const updateDriverLocation = async (driverId , location)=>{
    return await User.findByIdAndUpdate({_id:driverId , role:'driver'},{location},{new:true});
}

module.exports = {
    updateDriverLocation
}