// Script de depuración: carga los modelos y muestra qué está exportado
try {
  const models = require('../models');
  console.log('Loaded models:', Object.keys(models));
  if (models.Equipo) {
    console.log('Equipo typeof:', typeof models.Equipo);
    console.log('Equipo.findAll type:', typeof models.Equipo.findAll);
    try {
      console.log('Equipo prototype keys:', Object.getOwnPropertyNames(models.Equipo.prototype));
    } catch (e) {
      console.error('Error reading Equipo.prototype:', e && e.message);
    }
  } else {
    console.log('Equipo not found in models export');
  }
  console.log('Sequelize exists:', !!models.sequelize);
} catch (err) {
  console.error('Error cargando modelos:', err && err.stack);
}
