const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const router = require("./routes");
const cors = require("cors");
const path = require("path");

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

async function start() {
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
}

start();
