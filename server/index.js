const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config();

const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI ;

mongoose.connect(uri).then(() => console.log('MongoDB Connected Successfully !')).catch(err => console.log(err));

// registration collection 
const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  event: { type: String, required: true },
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

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send("Server of Volunteer-Network-FSN");
});

// Add Registration
app.post("/add-registration", async (req, res) => {
  console.log(req.body);
  const registration = new Registrations(req.body);
  const result = await registration.save();
  console.log(result.description);
  res.status(200).send(result);
});

// Add Events
app.post("/add-event", async (req, res) => {
  const newEvent = req.body ;
  const id = await Events.countDocuments();
  newEvent.id = id + 1;
  console.log(id, newEvent);
  const event = new Events(newEvent);
  const result = await event.save();
  console.log(result);
  res.status(200).send(result);
});

// Get Events Data 
app.get("/events", async (req, res) => {
  const result = await Events.find();
  console.log(`Get ${result.length} Events!`);
  res.status(200).send(result);
});
// get event by id
app.get("/events/:id", async(req, res) => {
  const result = await Events.find({id: req.params.id});
  console.log(`Get ${result[0].title} Event!`);
  res.status(200).send(result[0]);
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
          const result = await Registration.find({ email: userEmail });
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

app.listen(port);
