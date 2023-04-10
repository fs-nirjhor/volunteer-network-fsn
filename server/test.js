const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config();

//const port = process.env.PORT || 5000 ;
const port = 5000;
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Database uri 
const uri = process.env.MONGO_URI ;

async function main() {
  // Database Connection 
await mongoose.connect(uri).then(() => console.log('MongoDB Connected!'));

// registration collection 
const registrationSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  event: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
});
const Registrations = mongoose.model('Registrations', registrationSchema);

// event collection
const eventsSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true, unique: true },
  img: { type: String, required: true },
});
const Events = mongoose.model('Events', eventsSchema);

// Routes
app.get("/", (req, res) => {
  res.status(200).send("Server of Volunteer Network FSN");
});

// Add Registration
app.post("/add-registration", async (req, res) => {
  try {
  const newRegistration = req.body ;
  const id = await Registrations.countDocuments();
  newRegistration.id = id + 1;
  const registration = new Registrations(newRegistration);
  const result = await registration.save();
  console.log(result.description);
  res.status(200).send(result);
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
});

// Add Events
app.post("/add-event", async (req, res) => {
  try {
  const newEvent = req.body ;
  const id = await Events.countDocuments();
  newEvent.id = id + 1;
  const event = new Events(newEvent);
  const result = await event.save();
  console.log("New Event:" + result.title);
  res.status(200).send(result);
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
});

// Get Events Data 
app.get("/events", async (req, res) => {
  try {
  const result = await Events.find();
  console.log(`Get ${result.length} Events!`);
  res.status(200).send(result);
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  } 
});

// get event by id
app.get("/events/:id", async(req, res) => {
  try {
  const result = await Events.find({id: req.params.id});
  console.log(`Get ${result[0].title} Event!`);
  res.status(200).send(result[0]);
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
});

// Get Volunteer list 
app.get("/volunteer-list", async(req, res) => {
  try {
    const result = await Registrations.find();
    console.log(`Get ${result.length} Volunteers!`);
    res.status(200).send(result);
  } catch(error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// Get Registration Data
app.get("/registrations", async (req, res) => {
  const bearer = req.headers.authorization;
  if (bearer && bearer.startsWith("Bearer ")) {
    const idToken = bearer.split(" ")[1];
    await admin
      .auth()
      .verifyIdToken(idToken)
      .then(async (decodedToken) => {
        const tokenEmail = decodedToken.email;
        const userEmail = req.query.email;
        console.log({ tokenEmail, userEmail });
        if (tokenEmail === userEmail) {
          const result = await Registrations.find({ email: userEmail });
          res.status(200).send(result);
        } else {
          res.status(401).send("Un-authorized Access");
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(401).send("Un-authorized Access");
      });
  } else {
    res.status(401).send("Un-authorized Access");
  }
});
} 
main().catch(console.dir);

// Listenining
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
