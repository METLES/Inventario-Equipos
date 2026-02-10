const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Equipo = sequelize.define('Equipo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  assetId: {
    type: DataTypes.STRING,
    unique: true,
    field: 'id_activo'
  },
  tipo: {
    type: DataTypes.ENUM(
      'Desktop',
      'Laptop',
      'Monitor',
      'CPU',
      'Servidor',
      'Impresora',
      'Todo en uno',
      'Impresora multifuncional',
      'Pantalla',
      'Otro'
    ),
    allowNull: false
  },
  procesador: {
    type: DataTypes.STRING
  },
  ram: {
    type: DataTypes.STRING
  },
  sistemaOperativo: {
    type: DataTypes.STRING,
    field: 'sistema_operativo'
  },
  versionSistema: {
    type: DataTypes.STRING,
    field: 'version_sistema'
  },
  pantalla: {
    type: DataTypes.STRING
  },
  almacenamiento: {
    type: DataTypes.STRING
  },
  resguardatorio: {
    type: DataTypes.STRING
  },
  area: {
    type: DataTypes.STRING
  },
  estado: {
    type: DataTypes.ENUM(
      'Activo',
      'En reparación',
      'Inactivo',
      'Dado de baja'
    ),
    defaultValue: 'Activo'
  },
  fechaAdquisicion: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'fecha_adquisicion'
  },
  notas: {
    type: DataTypes.TEXT
  },
  marca: {
    type: DataTypes.STRING
  },
  modelo: {
    type: DataTypes.STRING
  },
  numSerie: {
    type: DataTypes.STRING,
    unique: true,
    field: 'num_serie'
  }
}, {
  tableName: 'equipos',
  timestamps: true,
  createdAt: 'creado',
  updatedAt: 'actualizado'
});

module.exports = Equipo;