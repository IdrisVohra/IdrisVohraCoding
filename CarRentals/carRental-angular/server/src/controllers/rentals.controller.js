const Rental = require('../models/rental.model');

async function listRentals(req, res, next) {
  try {
    const rentals = await Rental.findAll({
      where: { syncoperation: 'A' },
      order: [['id', 'DESC']],
    });
    res.json(rentals);
  } catch (err) {
    next(err);
  }
}

async function createRental(req, res, next) {
  try {
    const {
      vehicleId,
      customerName,
      customerAge,
      customerEmail,
      customerPhone,
      givenPlace,
      returnPlace,
      givenTime,
      returnTime,
      address,
      carModel,
      totalHours,
      pricePerHour,
      advancePaid,
      totalTripCharges,
      documentsSubmitted,
    } = req.body;

    const rental = await Rental.create({
      vehicleId,
      customerName,
      customerAge: String(customerAge),
      customerEmail,
      customerPhone: String(customerPhone),
      givenPlace,
      returnPlace,
      givenTime,
      returnTime,
      address,
      carModel,
      totalHours: Number(totalHours),
      pricePerHour: Number(pricePerHour),
      advancePaid: Number(advancePaid),
      totalTripCharges: Number(totalTripCharges),
      documentsSubmitted: Boolean(documentsSubmitted),
      syncoperation: 'A',
    });

    res.status(201).json(rental);
  } catch (err) {
    next(err);
  }
}

async function deleteRental(req, res, next) {
  try {
    const rentalId = Number(req.params.id);
    if (!Number.isInteger(rentalId)) {
      return res.status(400).json({ message: 'Invalid rental id.' });
    }

    const [affectedCount] = await Rental.update({ syncoperation: 'D' }, { where: { id: rentalId } });

    if (affectedCount === 0) {
      return res.status(404).json({ message: 'Rental not found.' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listRentals, createRental, deleteRental };
