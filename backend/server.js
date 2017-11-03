const express = require ('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const connect = process.env.MONGODB_URI;
mongoose.connect(connect);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const models = require('./models/models')
const User = models.User
const Post = models.Post

const routes = require('./routes/routes');
app.use('/', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, err => {if (err) {console.log(err)}})