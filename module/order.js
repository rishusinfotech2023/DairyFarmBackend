const mongoose = require('mongoose');
const { Schema } = mongoose;

const order = new Schema({
    name: { type: String },
    number: { type: Number },
    address: { type: String },
    product: { type: String },
    information: { type: String }
}, { collection: 'order' });

module.exports = mongoose.model('order', order);