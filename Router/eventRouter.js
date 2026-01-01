const express = require("express");
const router = express.Router();
const eventController = require("../Controller/eventController");
const upload = require("../utils/upload");

router.post("/events",upload.single("image"), eventController.createEvent);
router.get("/events", eventController.getEvents);
router.put("/events/:id", upload.single("image"),eventController.updateEvent);
router.delete("/events/:id", eventController.deleteEvent);

module.exports = router;