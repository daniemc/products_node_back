const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => console.log(err));

const mongo_connection = mongoose.connection;
mongo_connection.once('open', () => {
    console.log('Connected to mongo!');
});

const productRouter = require('./routes/product');

app.use('/products', productRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})