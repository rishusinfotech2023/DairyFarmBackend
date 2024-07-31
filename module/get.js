const mongoose = require('mongoose');
const { Schema } = mongoose;

const order = new Schema({
    name: { type: String },
    number: { type: Number },
        email: { type: String },
    message: { type: String }
}, { collection: 'getintouch' });

module.exports = mongoose.model('getintouch', order);