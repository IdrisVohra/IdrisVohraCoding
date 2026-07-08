const { Router } = require('express');
const { listRentals, createRental, deleteRental } = require('../controllers/rentals.controller');
const { validateRentalPayload } = require('../middleware/validate-rental');

const router = Router();

router.get('/', listRentals);
router.post('/', validateRentalPayload, createRental);
router.delete('/:id', deleteRental);

module.exports = router;
