const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
// No require a otros modelos aquí para evitar dependencias circulares.

const Computadora = sequelize.define('Computadora', {
  equipo_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'equipo',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  sistemaOper: {
    type: DataTypes.STRING(100)
  },
  almTipo: {
    type: DataTypes.STRING(50)
  },
  almSize: {
    type: DataTypes.FLOAT
  },
  memRam: {
    type: DataTypes.INTEGER
  },
  procesador: {
    type: DataTypes.STRING(100)
  },
  pantalla_asignada_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'equipo',
      key: 'id'
    },
    onDelete: 'SET NULL'
  }
}, {
  tableName: 'computadora',
  timestamps: false
});

// Las asociaciones se definen en `src/models/index.js` para evitar dependencias circulares.

module.exports = Computadora;