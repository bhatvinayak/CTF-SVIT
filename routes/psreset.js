const { Router } = require('express');
const psController = require('../controllers/psController');

const router = Router();

router.get('/forgotps', psController.ps_get);
router.post('/reqcode', psController.reqcode);
router.post('/submitcode',psController.ps_post)

module.exports = router;