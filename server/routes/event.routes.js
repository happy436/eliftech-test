const express = require("express");
const Events = require("../models/Events");
const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(async (req, res) => {
        try {
            const list = await Events.find();
            res.send(list);
        } catch (error) {
            res.status(500).json({
                message: "Error occurred on the server. Please try again later"
            });
        }
    })
    .post(async (req, res) => {
        try {
            const newEvent = await Events.create({
                ...req.body
            });
            res.status(201).send(newEvent);
        } catch (error) {
            res.status(500).json({
                message: "Error occurred on the server. Please try again later"
            });
        }
    });

router.get("/:eventId", async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Events.findOne({eventID: eventId});
        res.status(200).send(event);
    } catch (error) {
        res.status(500).json({
            message: "Error occurred on the server. Please try again later"
        });
    }
});

module.exports = router;
