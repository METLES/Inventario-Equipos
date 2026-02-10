const express = require('express');
const router = express.Router();
const personalController = require('../controllers/personalController');

router.get('/', personalController.listar);
router.get('/crear', (req, res) => res.render('personal/crear'));
router.post('/crear', personalController.crear);
router.get('/:id', personalController.ver);

module.exports = router;