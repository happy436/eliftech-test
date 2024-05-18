const express = require("express");
const router = express.Router({ mergeParams: true });
const Participants = require("../models/Participants");

router.patch("/:eventID", async (req, res) => {
    try {
        /* body: {
            eventId: '664859e083b6e8639a236f8d',
            name: 'a',
            email: 'a@a.com',
            dateOfBirth: 1714510800000,
            hearAboutEvent: 'Social media'
          }, */
        const { eventID } = req.params;
        const { eventId, ...newData } = req.body;
        if (eventID) {
            const newParticipant = await Participants.findByIdAndUpdate(
                eventID,
                { $push: { participants: newData } },
                { new: true }
            );
            res.send(newParticipant);
        } else {
            res.status(401).json({ message: "Don't found event" });
        }
        /* const { eventId } = req.params;
        if (userId) {
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
                new: true
            });
            res.send(updatedUser);
        } else {
            res.status(401).json({ message: "Unauthorized" });
        } */
    } catch (error) {
        res.status(500).json({
            message: "Error occurred on the server. Please try again later"
        });
    }
});

router.get("/:eventId", async (req, res) => {
    try {
        const { eventId } = req.params;
        const list = await Participants.findById(eventId);
        res.status(200).send(list.participants);
    } catch (error) {
        res.status(500).json({
            message: "Error occurred on the server. Please try again later"
        });
    }
});

module.exports = router;
