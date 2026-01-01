const DB = require("../utils/db-connection");
const { ObjectId } = require("mongodb");
const createEvent = async (req, res) => {
  try {
    const db = DB.getDB();

    const {
      type,
      uid,
      name,
      tagline,
      schedule,
      description,
      moderator,
      category,
      sub_category,
      rigor_rank,
      attendees,
    } = req.body;

    const eventData = {
      type,
      uid: Number(uid),
      name,
      tagline,
      schedule: new Date(schedule),
      description,
      moderator: Number(moderator),
      category,
      sub_category,
      rigor_rank: Number(rigor_rank),
      attendees: attendees ? JSON.parse(attendees) : [],
      image: req.file ? `/uploads/${req.file.filename}` : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("events").insertOne(eventData);

    res.status(201).json({
      message: "Event created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create event",
      error: err.message,
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const db = DB.getDB();

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const type = req.query.type;
    const ignorePage = (page - 1) * limit;
    const eventId = req.query._id;

    if (eventId) {
      const event = await db
        .collection("events")
        .findOne({ _id: new ObjectId(eventId) });

      return res
        .status(200)
        .json({ message: "Event fetched successfully", data: event });
    }
    console.log(type);
    const events = await db
      .collection("events")
      .find({ type })
      .skip(ignorePage)
      .limit(limit)
      .toArray();

    res
      .status(200)
      .json({ message: "Events fetched successfully", data: events });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch events", error: err.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const db = DB.getDB();
    const eventId = req.params.id;
    const {
      type,
      uid,
      name,
      tagline,
      schedule,
      description,
      moderator,
      category,
      sub_category,
      rigor_rank,
      attendees,
    } = req.body;

    const updateData = {
      type,
      uid: Number(uid),
      name,
      tagline,
      schedule: new Date(schedule),
      description,
      moderator: Number(moderator),
      category,
      sub_category,
      rigor_rank: Number(rigor_rank),
      attendees: attendees ? JSON.parse(attendees) : [],
      image: req.file ? `/uploads/${req.file.filename}` : null,
      updatedAt: new Date(),
    };
    const updatedEvent = await db
      .collection("events")
      .updateOne({ _id: new ObjectId(eventId) }, { $set: updateData });
    res
      .status(200)
      .json({ message: "Event updated successfully", data: updatedEvent });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update event", error: err.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const db = DB.getDB();
    const eventId = req.params.id;
    const deletedEvent = await db
      .collection("events")
      .deleteOne({ _id: new ObjectId(eventId) });
    res
      .status(200)
      .json({ message: "Event deleted successfully", data: deletedEvent });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete event", error: err.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
};
