const express = require('express');
const FixturesController = require('./controllers/FixturesController');

const router = express.Router();

router.post('/fixtures/refresh', FixturesController.refreshFixtures);

module.exports = router;
