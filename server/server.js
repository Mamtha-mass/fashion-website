const express = require("express");
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const connectDB = require('./config/db');

const app = express();
// Use the ML_DB connection from the connections object
connectDB();
PORT = 8087;
// // custom middleware logger
// app.use(logger);

// handle options credentals check before CORS
// and fetch cookies credentials requirement
app.use(credentials);

// cors
app.use(cors(corsOptions));

// middleware for json objects
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// routes
const userrRoutes = require('./routes/user');
app.use('/api', userrRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
  });

app.use('/cart', require('./routes/cart'));

// custom error handling 
app.use(errorHandler);

// start listening
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
