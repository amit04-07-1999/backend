const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');


const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv.config();

app.use(cors());
app.use(express.json());

//mongoDB setup
const url = process.env.MONGODB_URI;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.once('open', () => {
  console.log('MongoDB database connected');
});

//route setup
app.use('/api', userRoutes);
app.use('/api', postRoutes);


//port setup
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
