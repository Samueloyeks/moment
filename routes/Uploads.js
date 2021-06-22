const express = require('express');
const UploadsController = require('../app/Controllers/Utility/UploadsController');
const authGuard = require('../guards/Auth');


const router = express.Router();

router.get('/', UploadsController.downloadFile, authGuard.protect);

// router.get('/', ReservationController.index, authGuard.protect);


module.exports = router;
