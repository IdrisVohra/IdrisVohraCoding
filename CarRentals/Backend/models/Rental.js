const { DataTypes } = require("sequelize");
const sequelize = require("../config/DatabaseConnection.js");

const Rental = sequelize.define("Rental", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  vehicleId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carModel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  givenTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  returnTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalHours: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  extensionTime: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  pricePerHour: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  advancePaid: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalTripCharges: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  documentsSubmitted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});



module.exports = Rental;
