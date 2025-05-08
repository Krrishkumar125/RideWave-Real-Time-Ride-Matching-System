const mongoose = require('mongoose');

const connect = async () =>{
    try {
       await mongoose.connect(process.env.MONGO_URI ,{
        useNewUrlParser : true,
        useUnifiedTopology : true
       });
       console.log('mongo db connected');
    } catch (error) {
        console.log('mongodb connection error' , error);
        process.exit(1);
    }
}

module.exports = connect;