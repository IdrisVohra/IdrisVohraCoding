const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("CarRentals", "CarRentals", "HamdamCarRental", {
  host: "DESKTOP-GDM06K2",
  dialect: "mssql",
  dialectOptions: {
    options: {
      trustedConnection: true,
      encrypt: false,
      trustServerCertificate: true,
    },
  },
});

  sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to MSSQL with Windows Authentication has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err.message);
    console.error("Detailed Error: ", err.original);
  });


module.exports = sequelize;
