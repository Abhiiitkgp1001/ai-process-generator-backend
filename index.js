const express = require('express');
const env = require('dotenv');
env.config();
const connectDB = require('./db');
const router = require('./routes/process_routes');
const cors = require("cors");

const app = express();
//body parser
app.use(express.json());
app.use(cors());
//connect to database
connectDB();
app.use('/process', router);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));