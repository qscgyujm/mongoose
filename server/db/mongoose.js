const mongoose = require('mongoose');


const db = 'mongodb://root:root@54.238.213.8:27017/Test';
mongoose.Promise = global.Promise;
mongoose.connect(db);


module.exports = { mongoose };