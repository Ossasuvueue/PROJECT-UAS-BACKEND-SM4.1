const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors())
// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/sekolah', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Rute
const userRouter = require('./routes/user');
app.use('/user', userRouter);

// Memulai server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});