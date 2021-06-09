const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = module.exports = express();
const corsOptions = {
  origin: "http://localhost:8081"
};

// parse requests of content-type - application/json
// parse requests of content-type - application/x-www-form-urlencoded
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Unknown endpoints
app.all("/api/*", (_, res) => {
  res.status(404).json({
    error: "No valid endpoint"
  });
});


// Handle production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'));
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Connect to the db
const db = require("./models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the "+app.get('env')+" database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


if (app.get('env') === 'development') db.dropCollectionCustom()

