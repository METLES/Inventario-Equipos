const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
// No require a otros modelos aquí para evitar dependencias circulares.

const Pantalla = sequelize.define('Pantalla', {
  equipo_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    // Referencia a `equipo.id` se manejará mediante asociaciones en `src/models/index.js`.
  },
  pulgadas: {
    type: DataTypes.FLOAT
  },
  resolucion: {
    type: DataTypes.STRING
  },
  conexion: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'pantalla',
  timestamps: false
});

// Asociaciones definidas en `src/models/index.js`.

module.exports = Pantalla;