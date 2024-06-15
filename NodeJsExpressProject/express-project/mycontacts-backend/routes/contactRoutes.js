const express = require('express')
const router = express.Router();
const {getContact,getContactById,createContact,updateContact,deleteContact} = require("../controllers/contactController")

router.route('/').get(getContact);
router.route('/:id').get(getContactById).post(createContact).put(updateContact).delete(deleteContact);



module.exports = router;