const express = require('express');
const router = express.Router();
const equipoController = require('../controllers/equipoController');

// Ruta principal (renderiza tu vista HTML)
router.get('/', equipoController.index);

// API para operaciones AJAX
router.get('/api/equipos', equipoController.getEquipos);
router.get('/api/buscar', equipoController.buscar);
router.get('/api/stats', equipoController.getStats);
router.post('/api/crear', equipoController.crear);

module.exports = router;