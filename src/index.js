const dotenv = require('dotenv');
const express = require('express');
const http = require('http');
const cors = require('cors');

const connect = require('./utils/db');
const {redisClient} = require('./utils/redisClient');

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

connect();

server.listen(process.env.PORT , async()=>{
    console.log(`Server started on PORT ${process.env.PORT}`);
});

redisClient.on('connect' , ()=>{
    console.log('connected to redis');
})