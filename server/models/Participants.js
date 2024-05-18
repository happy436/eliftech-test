const { Schema, model } = require("mongoose");

const participantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateOfBirth: { type: Date, required: true },
    hearAboutEvent: {
        type: String,
        required: true
    }
});

const eventSchema = new Schema({
    eventID: {
        type: String,
        required: true
    },
    participants: [participantSchema]
});

const Participants = model("Participants", eventSchema);

module.exports = Participants;
