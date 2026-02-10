const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const equipoRoutes = require('./routes/equipoRoutes');

const app = express();

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Rutas
app.use('/', equipoRoutes);

// Sincronizar BD y arrancar
const PORT = process.env.PORT || 3000;

(async () => {
  const dbName = process.env.DB_NAME || 'undefined';
  const dbUser = process.env.DB_USER || 'undefined';
  const dbHost = process.env.DB_HOST || 'localhost';
  const dbPort = process.env.DB_PORT || 3306;

  console.log(`Intentando conectar a la base de datos ${dbName} en ${dbHost}:${dbPort} como ${dbUser}`);

  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log(`Conectado y sincronizada la base de datos ${dbName}`);
  } catch (err) {
    // Mostrar error de conexión de forma clara en consola para depuración
    console.error('No se pudo conectar a la base de datos:');
    if (err && err.parent && err.parent.code) {
      console.error('Código de error:', err.parent.code);
    }
    console.error(err && err.message ? err.message : err);
    console.error('Continuando sin sincronizar la base de datos (modo desarrollo)');
  }

  app.listen(PORT, () => {
    console.log('Servidor en http://localhost:' + PORT);
  });
})();

module.exports = app;