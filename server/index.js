const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config();

// Firebase admin
var admin = require("firebase-admin");

var serviceAccount = require("./configs/volunteer-network-fsn-firebase-adminsdk-lr7y5-a853f318f1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://volunteer-network-fsn.firebaseio.com'
});


//const port = process.env.PORT || 5000 ;
const port = 5000;
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.status(200).send("Server of Volunteer Network FSN");
});

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
  img: { type: String, required: true },
});
const Registrations = mongoose.model('Registrations', registrationSchema);

// event collection
const eventsSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true, unique: true },
  img: { type: String, required: true },
});
const Events = mongoose.model('Events', eventsSchema);

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

// Get registered events 
app.get("/registered-events", async (req,res) => {
  try {
    const userEmail = req.query.email ;
    const idToken = req.headers.authorization;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken?.email === userEmail) {
      const result = await Registrations.find({email: userEmail});
      console.log(`Get ${result.length} Registered Events!`);
      res.status(200).send(result);
    } else {
      console.log("Un-authorized access!");
      res.status(401).send("Un-authorized access!");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// search results
app.get("/search", async (req, res) => {
  try {
    const search = req.query.search ;
  const result = await Events.find({ title: { $regex: search, $options: "i" } });
  console.log(`Get ${result.length} search results for ${search}!`);
  res.status(200).send(result);
  } catch (error) {
  console.log(error.message);
    res.status(500).send(error.message);
  }
});

// Delete Registration
app.delete("/delete-registration", async (req,res) => {
  try {
    const id = req.body.id;
    const result = await Registrations.findByIdAndDelete(id);
    console.log(`Deleted Registration: ${result.event} (${result.name})`);
    res.status(200).send(result);
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
});

// Delete registered event
app.delete("/cancel-registered-event", async (req, res) => {
  try {
    const id = req.body.id;
    const result = await Registrations.findByIdAndDelete(id);
    console.log(`Cancelled Registration: ${result.event} (${result.name})`);
    res.status(200).send(result);
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
});

} 
main().catch(console.dir);


// Listenining
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
