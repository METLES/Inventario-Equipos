const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
// No require a otros modelos aquí para evitar dependencias circulares.

const Impresora = sequelize.define('Impresora', {
  equipo_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'equipo',
      key: 'id'
    },
    onDelete: 'CASCADE'
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