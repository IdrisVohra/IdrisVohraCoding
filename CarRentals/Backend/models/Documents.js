const { DataTypes } = require("sequelize");
const sequelize = require("../config/DatabaseConnection.js");

const SubmittedDocuments = sequelize.define('SubmittedDocuments', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    vehicleId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rentalId: {
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: false,
  });


  module.exports = SubmittedDocuments;
