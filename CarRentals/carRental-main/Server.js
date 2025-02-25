const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./src/config/DatabaseConnection.js");
const Rentals = require("./src/models/Rental.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

sequelize.sync()
  .then(() => console.log("Database synchronized"))
  .catch(err => console.error("Error syncing database", err));

// [HttpGet Method]
app.get("/api/rentals", async (req, res) => {
try {
    const rentals = await Rentals.findAll({
        where: {
            SYNCOPERATION: 'A'
        }
    });
    res.json(rentals);
} catch (err) {
    res.status(500).json(err.message);
}
});

// [HttpPost Method]
app.post("/api/rentals", async (req, res) => {
    const {
        carRegNumber,
        name,
        age,
        email,
        phone,
        pickUp,
        dropOff,
        pickTime,
        dropTime,
        address,
        carType,
        totalHours,
        pricePerHour,
        advancePaid,
        totalTripCharge,
        documentsSubmitted,
    } = req.body;

    const sql = `INSERT INTO rentals VALUES ('${carRegNumber}', '${name}', ${age}, '${email}', '${phone}', '${pickUp}', '${dropOff}', '${pickTime}', '${dropTime}', '${address}', '${carType}', ${totalHours}, ${pricePerHour}, ${advancePaid}, ${totalTripCharge}, '${documentsSubmitted}', 'A')`;

    sequelize.query(sql, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
            return;
        }
        console.log('1 record inserted');
        res.status(201).send('Record inserted successfully');
    });
});

// [HttpDelete Method]
app.delete('/api/rentals/:id', async (req, res) => {
    try
    {
        const rentalId = req.params.id;
        const sql = `Update Rentals SET SYNCOPERATION = 'D' WHERE id = ${rentalId}`;

        sequelize.query(sql, (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            res.status(500).send('Error deleting data');
            return;
        }
        console.log('1 record deleted');
        res.status(201).send('Record deleted successfully');
        });
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }
});

app.listen(5000, () => {
console.log("Server running on port 5000");
});
  