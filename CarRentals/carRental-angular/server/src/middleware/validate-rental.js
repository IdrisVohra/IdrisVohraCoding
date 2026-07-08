const REQUIRED_FIELDS = [
  'vehicleId',
  'customerName',
  'customerAge',
  'customerEmail',
  'customerPhone',
  'givenPlace',
  'returnPlace',
  'givenTime',
  'returnTime',
  'address',
  'carModel',
  'totalHours',
  'pricePerHour',
  'advancePaid',
  'totalTripCharges',
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRentalPayload(req, res, next) {
  const body = req.body ?? {};
  const missing = REQUIRED_FIELDS.filter((field) => {
    const value = body[field];
    return value === undefined || value === null || value === '';
  });

  if (missing.length > 0) {
    return res.status(400).json({ message: `Missing required field(s): ${missing.join(', ')}` });
  }

  if (!EMAIL_PATTERN.test(body.customerEmail)) {
    return res.status(400).json({ message: 'customerEmail must be a valid email address.' });
  }

  const numericFields = ['customerAge', 'totalHours', 'pricePerHour', 'advancePaid', 'totalTripCharges'];
  const invalidNumeric = numericFields.filter((field) => Number.isNaN(Number(body[field])));
  if (invalidNumeric.length > 0) {
    return res.status(400).json({ message: `Field(s) must be numeric: ${invalidNumeric.join(', ')}` });
  }

  if (Number.isNaN(new Date(body.givenTime).getTime()) || Number.isNaN(new Date(body.returnTime).getTime())) {
    return res.status(400).json({ message: 'givenTime and returnTime must be valid dates.' });
  }

  next();
}

module.exports = { validateRentalPayload };
