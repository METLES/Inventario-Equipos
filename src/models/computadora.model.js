const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
// No require a otros modelos aquí para evitar dependencias circulares.

const Computadora = sequelize.define('Computadora', {
  equipo_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    // No usar `references` aquí con la clase importada para evitar cargas circulares.
    // Sequelize creará la FK cuando sincronices y cuando definas las asociaciones
    // en `src/models/index.js`.
  },
  sistemaOper: {
    type: DataTypes.STRING
  },
  almTipo: {
    type: DataTypes.STRING
  },
  almSize: {
    type: DataTypes.FLOAT
  },
  memRam: {
    type: DataTypes.INTEGER
  },
  procesador: {
    type: DataTypes.STRING
  }
  ,
  pantalla_asignada_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'computadora',
  timestamps: false
});

// Las asociaciones se definen en `src/models/index.js` para evitar dependencias circulares.

module.exports = Computadora;