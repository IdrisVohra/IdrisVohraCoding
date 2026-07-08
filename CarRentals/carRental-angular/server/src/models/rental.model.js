const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rental = sequelize.define(
  'Rental',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    vehicleId: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    customerName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    customerAge: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    customerEmail: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    customerPhone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    givenPlace: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    returnPlace: {
      type: DataTypes.STRING(50),
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
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    carModel: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    totalHours: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    syncoperation: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'A',
    },
  },
  {
    tableName: 'Rentals',
    timestamps: false,
  },
);

module.exports = Rental;
