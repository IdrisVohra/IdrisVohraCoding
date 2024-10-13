// backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/DatabaseConnection.js");
const Rental = require("./models/Rental");
const SubmittedDocuments = require("./models/Documents.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

sequelize.sync()
  .then(() => console.log("Database synchronized"))
  .catch(err => console.error("Error syncing database", err));

//[HttpPost Method]
app.post("/api/rentals", async (req, res) => {
  const {
    vehicleId,
    customerName,
    address,
    carModel,
    givenTime,
    returnTime,
    totalHours,
    extensionTime,
    pricePerHour,
    advancePaid,
    totalTripCharges,
    documentsSubmitted
  } = req.body;

  try {
    const rental = await Rental.create({
      vehicleId,
      customerName,
      address,
      carModel,
      givenTime,
      returnTime,
      totalHours,
      extensionTime,
      pricePerHour,
      advancePaid,
      totalTripCharges,
      documentsSubmitted
    });
    
    res.status(201).json(rental);
  } catch (err) {
    console.error("Error creating rental:", err);
    res.status(500).json({ error: "Failed to create rental entry" });
  }
});

//[HttpGet Method]
app.get("/api/rentals", async (req, res) => {
  try {
    const rentals = await Rental.findAll();
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve rentals" });
  }
});

//[HttpGet Method]
app.get("/api/rentals/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const rentalById = await Rental.findAll({
      where: { id },
    });

    res.status(200).json(rentalById);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve rentals" });
  }
});

//[HttpGet Method]
app.get("/api/documents/:rentalId", async (req, res) => {
  const { rentalId } = req.params.rentalId;
  try {
    const documents = await SubmittedDocuments.findAll({
      where: { rentalId },
    });

    res.status(200).json(documents);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch documents" + err });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
