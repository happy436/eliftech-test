const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const router = require("./routes");
const cors = require("cors");
const path = require("path");
const fs = require('fs');
const { ObjectId } = require('mongodb');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", router);

const PORT = config.get("port") ?? 8080;

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client")));

    const indexPath = path.join(__dirname, "client", "index.html");

    app.get("*", (req, res) => {
        res.sendFile(indexPath);
    });
}




const Event = require("./models/Events"); 
const Participant = require("./models/Participants"); 

async function loadJsonData(filePath) {
    const data = await fs.promises.readFile(filePath, "utf8");
    return JSON.parse(data);
}

async function initializeDatabase() {
    const eventCount = await Event.countDocuments();
    const participantCount = await Participant.countDocuments();

    if (eventCount === 0 && participantCount === 0) {
        console.log("Database is empty. Loading initial data...");

        let events = await loadJsonData("./mockData/events.json");
        let participants = await loadJsonData("./mockData/participants.json");

        await Event.insertMany(events);
        await Participant.insertMany(participants);

        console.log("Initial data has been loaded.");
    } else {
        console.log("Database is not empty. Skipping data initialization.");
    }
}

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected.");

        await initializeDatabase();

        app.listen(PORT, () =>
            console.log(`Server has been started on port ${PORT}...`)
        );
    } catch (e) {
        console.log(e.message);
        process.exit(1);
    }
}

/* async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"));
        console.log(`MongoDB connected.`);
        app.listen(PORT, () =>
            console.log(
                `Server has been started on port ${PORT}...`
            )
        );
    } catch (e) {
        console.log(e.message);
        process.exit(1);
    }
} */

start();
