const { Schema, model } = require("mongoose");

const schema = new Schema({
    eventID: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    organizer: {
        type: String,
        required: true
    }

    /*     _id: {
        type: Schema.Types.ObjectId,
        required: true
    } */
});

module.exports = model("Events", schema);
