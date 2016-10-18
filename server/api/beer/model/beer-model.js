"use strict";

const mongoose = require('mongoose');

const _beerSchema = {
    beerMessage: {type: String, required: true, trim: true},
    createdAt: {type: Date, default: Date.now}
}

module.exports = mongoose.Schema(_beerSchema);
