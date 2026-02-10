import {Router} from 'express'
const router = Router();

const equipoRoutes = require('./equipoRoutes');
const personalRoutes = require('./personalRoutes');

// Rutas principales
router.use('/equipos', equipoRoutes);
router.use('/personal', personalRoutes);

router.get('/', (req, res) => {
  res.redirect('/equipos');
});

module.exports = router;