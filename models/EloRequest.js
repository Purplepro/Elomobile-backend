const mongoose = require('mongoose');
const {Schema} = mongoose;


const eloRequestSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },

    evMake: {
            type: String,
            required: true
    },

    evModel: {
            type: String,
            required: true,
    },

    color: {
            type: String,
            required: true,
    },

    location: {
            type: String,
            required: true,
    },

    phoneNumber: {
        type: String,
        required: true,
    },

    createdAt: { type: Date, default: Date.now },

    UserId: String

})

const eloRequest = mongoose.model('eloRequest', eloRequestSchema);
module.exports = eloRequest;


// as a user I want to 
// input my name, vehicle type,
//  vehicle color, year, address, 
//  phone number, and email
