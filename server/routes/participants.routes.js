const express = require("express");
const router = express.Router({ mergeParams: true });
const Participants = require("../models/Participants");

router.patch("/:eventId", async (req, res) => {
    try {
        const { eventId } = req.params;
        
        if (eventId) {
            const newParticipant = await Participants.findOneAndUpdate(
                {eventID: eventId},
                { $push: { participants: req.body } },
                { new: true }
            );
            res.send(newParticipant);
        } else {
            res.status(401).json({ message: "Don't found event" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error occurred on the server. Please try again later"
        });
    }
});

router.get("/:eventId", async (req, res) => {
    try {
        const { eventId } = req.params;
        const list = await Participants.findOne({eventID: eventId});
        res.status(200).send(list.participants);
    } catch (error) {
        res.status(500).json({
            message: "Error occurred on the server. Please try again later"
        });
    }
});

module.exports = router;
