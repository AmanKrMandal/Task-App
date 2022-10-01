const mongoose = require('mongoose');

const regisSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    role: {type:String, default:"user"},
    date:String
});
module.exports = mongoose.model('registrations', regisSchema);
