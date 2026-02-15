

// const express = require('express');
// const path = require('path');


// const app = express();

// app.use(express.json());

// // app.use(express.static(path.join(__dirname, 'public')));






// module.exports = app;


const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');


const cartRoutes = require('./routes/cartRoutes');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.send('Server is working');
});

app.use('/api/cart', cartRoutes);

module.exports = app;
