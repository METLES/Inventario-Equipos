const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Personal = sequelize.define('Personal', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cargo: {
    type: DataTypes.STRING(100)
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    validate: {
      isEmail: true
    }
  },
  telefono: {
    type: DataTypes.STRING(20)
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  creado: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'personal',
  timestamps: false
});

module.exports = Personal;