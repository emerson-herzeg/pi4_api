const express = require('express');
const forecastController = require('../controllers/forecastController');
const influxdbController = require('../controllers/influxdbController');

const router = express.Router();

router
    .route('/forecast')
    .get(forecastController.forecast);

router
    .route('/influxdb')
    .get(influxdbController.influxdb);

module.exports = router;
