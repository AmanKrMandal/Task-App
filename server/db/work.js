const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    heading: String,
    description: String,
    file: String,
    status: { type: String, default: "pending" },
    date: String,
    user: String,
    username:String
});
module.exports = mongoose.model('works', workSchema);
