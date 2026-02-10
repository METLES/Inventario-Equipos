// Centraliza la carga de modelos y define asociaciones entre ellos.
const sequelize = require('../config/database');

const Personal = require('./personal.model');
const Equipo = require('./equipo.model');
const Computadora = require('./computadora.model');
const Pantalla = require('./pantalla.model');
const Impresora = require('./impresora.model');

// Debug checks: asegurar que los módulos exporten Model de Sequelize
const { Model } = require('sequelize');
function assertModel(name, obj) {
  if (!obj || typeof obj !== 'function' || !(obj.prototype instanceof Model)) {
    console.error(`Modelo inválido para ${name}: tipo=${typeof obj}`);
    if (obj && typeof obj === 'object') console.error('Keys:', Object.keys(obj));
    throw new Error(`${name} no es una clase de Sequelize.Model`);
  }
}
assertModel('Personal', Personal);
assertModel('Equipo', Equipo);
assertModel('Computadora', Computadora);
assertModel('Pantalla', Pantalla);
assertModel('Impresora', Impresora);

// Asociaciones entre tablas
// Un `Personal` puede registrar muchos `Equipo` (registrado_por)
Personal.hasMany(Equipo, { foreignKey: 'registrado_por', as: 'equipos' });
Equipo.belongsTo(Personal, { foreignKey: 'registrado_por', as: 'registradoPor' });

// Relaciones 1:1 entre equipo y detalles específicos
// Usar alias `as` distintos a nombres de atributos para evitar colisiones
Equipo.hasOne(Computadora, { foreignKey: 'equipo_id', as: 'detalleComputadora' });
Computadora.belongsTo(Equipo, { foreignKey: 'equipo_id', as: 'equipo' });

Equipo.hasOne(Pantalla, { foreignKey: 'equipo_id', as: 'detallePantalla' });
Pantalla.belongsTo(Equipo, { foreignKey: 'equipo_id', as: 'equipo' });

Equipo.hasOne(Impresora, { foreignKey: 'equipo_id', as: 'detalleImpresora' });
Impresora.belongsTo(Equipo, { foreignKey: 'equipo_id', as: 'equipo' });

// Asociación para pantalla asignada a una computadora (pantalla_asignada_id en computadora)
Computadora.belongsTo(Equipo, { foreignKey: 'pantalla_asignada_id', as: 'pantallaAsignada' });
Equipo.hasMany(Computadora, { foreignKey: 'pantalla_asignada_id', as: 'computadorasConEstaPantalla' });

module.exports = {
  sequelize,
  Personal,
  Equipo,
  Computadora,
  Pantalla,
  Impresora
};
