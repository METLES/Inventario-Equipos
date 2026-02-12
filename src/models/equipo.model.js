const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');
const Equipo = sequelize.define('Equipo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  marca: {
    type: DataTypes.STRING
  },
  modelo: {
    type: DataTypes.STRING
  },
  numSerie: {
    type: DataTypes.STRING,
    unique: true
  },
  tipoEquipo: {
    type: DataTypes.ENUM(
      'Desktop',
      'Laptop',
      'Todo en uno',
      'Servidor',
      'Impresora multifuncional',
      'Impresora',
      'Pantalla',
      'Periferico'
    ),
    allowNull: false
  },
  estadoEquipo: {
    type: DataTypes.ENUM(
      'Activo',
      'Inactivo',
      'En_reparacion',
      'Dado_de_baja'
    ),
    allowNull: false,
    defaultValue: 'Activo'
  },
  fechaAdquisicion: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  ubicacion: {
    type: DataTypes.STRING(200)
  },
  creado: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  actualizado: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  observaciones: {
    type: DataTypes.TEXT
  },
  registrado_por: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'personal',
      key: 'id'
    },
    onDelete: 'SET NULL'
  }
}, {
  tableName: 'equipo',
  timestamps: true,
  createdAt: 'creado',
  updatedAt: 'actualizado'
});

module.exports = Equipo;