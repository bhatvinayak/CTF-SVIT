const { Router } = require('express');
const challengeController = require('../controllers/challengecontroller');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.get('/challenge1',requireAuth, challengeController.c1_get);

module.exports = router;