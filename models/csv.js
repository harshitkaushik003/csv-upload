const mongoose = require('mongoose');

const csvSchema = new mongoose.Schema({
    name: {type: String, required: true},
    header_row: {type: [String]},
    data_row: {type: [mongoose.Schema.Types.Mixed]}
});

const Csv = mongoose.model("Csv", csvSchema);
module.exports = Csv;