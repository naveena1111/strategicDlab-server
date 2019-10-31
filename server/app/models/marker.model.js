
'use strict'
const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const MarkerSchema = mongoose.Schema({
    latitude: {
        type: SchemaTypes.Double
    },
    longitude:{
        type: SchemaTypes.Double
    },
    address:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Marker', MarkerSchema);