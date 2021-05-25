const express = require('express');
const FixturesController = require('./controllers/FixturesController');
const HealthController = require('./controllers/HealthController');

const router = express.Router();

router.post('/fixtures/refresh', FixturesController.refreshFixtures);
router.get('/health-check', HealthController.BasicPing);

module.exports = router;
