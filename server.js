const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 
// require('./seed')
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const chefsRoute = require('./Routes/Chef'); 
app.use("/chefs",chefsRoute) 

const recceteRoute = require('./Routes/Reccete'); 
app.use("/reccete",recceteRoute) 

const restaurantRoute = require('./Routes/Restaurant'); 
app.use("/restaurant",restaurantRoute) 

const user = require('./Routes/User'); 
app.use("/user",user) 

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`);
});
