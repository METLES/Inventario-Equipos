const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
// No require a otros modelos aquí para evitar dependencias circulares.

const Pantalla = sequelize.define('Pantalla', {
  equipo_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'equipo',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  pulgadas: {
    type: DataTypes.FLOAT
  },
  resolucion: {
    type: DataTypes.STRING(50)
  },
  conexion: {
    type: DataTypes.STRING(50)
  }
}, {
  tableName: 'pantalla',
  timestamps: false
});

// Asociaciones definidas en `src/models/index.js`.

module.exports = Pantalla;