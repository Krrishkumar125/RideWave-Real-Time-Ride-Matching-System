const dotenv = require('dotenv');
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');

const connect = require('./utils/db');
const {redisClient} = require('./utils/redisClient');

const authRoutes = require('./routes/authRoutes');
const passengerRoutes = require('./routes/passengerRoutes');
const driverRoutes = require('./routes/driverRoutes');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server , {
    cors:{
        origin: "http://127.0.0.1:5500",
        methods : ["GET" , "POST"]
    }
})

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

connect();

app.use('/api/auth', authRoutes);
app.use('/api/passenger', passengerRoutes);
app.use('/api/driver' , driverRoutes);

server.listen(process.env.PORT , async()=>{
    console.log(`Server started on PORT ${process.env.PORT}`);
});

redisClient.on('connect' , ()=>{
    console.log('connected to redis');
})

io.on('connection' , (socket) =>{
    console.log(`A new user connected. Total connections: ${io.engine.clientsCount}`,socket.id);
    socket.on('registerDriver' , async(driverId) =>{
        await locationService.setDriverSocket(driverId , socket.id);
    })

    socket.on('disconnect', async () => {
        if (socket.driverId) {
            await locationService.deleteDriverSocket(`driver:${socket.driverId}`);
        }
    })
    // io.sockets.sockets.forEach((socket) => {
    //     socket.disconnect(true); // `true` ensures it's a forceful disconnect
    //   });
    console.log(io.sockets.sockets.size);
})