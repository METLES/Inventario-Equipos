const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
// No require a otros modelos aquí para evitar dependencias circulares.

const Impresora = sequelize.define('Impresora', {
  equipo_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    // FK gestionada por las asociaciones en `src/models/index.js`.
  },
  tipo: {
    type: DataTypes.ENUM('inyeccion', 'laser')
  },
  impColor: {
    type: DataTypes.BOOLEAN
  },
  escaner: {
    type: DataTypes.BOOLEAN
  },
  copiadora: {
    type: DataTypes.BOOLEAN
  }
}, {
  tableName: 'impresora',
  timestamps: false
});

// Asociaciones definidas en `src/models/index.js`.

module.exports = Impresora;