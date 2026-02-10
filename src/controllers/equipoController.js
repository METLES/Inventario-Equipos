const { Equipo, sequelize } = require('../models');
const { Op } = require('sequelize');

const equipoController = {
  // Renderizar la vista principal (tu HTML)
  async index(req, res) {
    try {
      const equipos = await Equipo.findAll({
        order: [['creado', 'DESC']]
      });
      
      // Renderizar tu vista existente
      res.render('index', { 
        equipos,
        totalEquipos: equipos.length
      });
    } catch (error) {
      console.error('Error al obtener equipos:', error);
      res.render('index', { 
        equipos: [],
        totalEquipos: 0,
        error: 'Error al cargar equipos'
      });
    }
  },

  // Buscar equipos (para la búsqueda en tiempo real)
  async buscar(req, res) {
    try {
      const { query, tipo, estado, area } = req.query;
      let whereClause = {};
      
      // Construir condiciones de búsqueda
      if (query) {
        whereClause = {
          [Op.or]: [
            { assetId: { [Op.like]: `%${query}%` } },
            { tipo: { [Op.like]: `%${query}%` } },
            { procesador: { [Op.like]: `%${query}%` } },
            { sistemaOperativo: { [Op.like]: `%${query}%` } },
            { resguardatorio: { [Op.like]: `%${query}%` } }
          ]
        };
      }
      
      if (tipo && tipo !== 'Todos') {
        whereClause.tipo = tipo;
      }
      
      if (estado && estado !== 'Todos') {
        whereClause.estado = estado;
      }
      
      if (area && area !== 'Todas') {
        whereClause.area = area;
      }
      
      const equipos = await Equipo.findAll({
        where: whereClause,
        order: [['creado', 'DESC']]
      });
      
      res.json({ equipos, total: equipos.length });
    } catch (error) {
      console.error('Error en búsqueda:', error);
      res.status(500).json({ error: 'Error en la búsqueda' });
    }
  },

  // Crear nuevo equipo (desde el modal)
  async crear(req, res) {
    try {
      const equipoData = req.body;
      
      // Generar ID automático si no se proporciona
      if (!equipoData.assetId) {
        const year = new Date().getFullYear();
        const count = await Equipo.count();
        equipoData.assetId = `GOB-${year}-${String(count + 1).padStart(3, '0')}`;
      }
      
      const equipo = await Equipo.create(equipoData);
      
      res.json({ 
        success: true, 
        message: 'Equipo agregado exitosamente',
        equipo 
      });
    } catch (error) {
      console.error('Error al crear equipo:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error al agregar equipo',
        error: error.message 
      });
    }
  },

  // Obtener equipos para la tabla
  async getEquipos(req, res) {
    try {
      const equipos = await Equipo.findAll({
        attributes: [
          'id',
          'assetId',
          'tipo',
          'procesador',
          'sistemaOperativo',
          'versionSistema',
          'resguardatorio',
          'estado',
          'notas'
        ],
        order: [['creado', 'DESC']]
      });
      
      res.json(equipos);
    } catch (error) {
      console.error('Error al obtener equipos:', error);
      res.status(500).json({ error: 'Error al obtener equipos' });
    }
  },

  // Obtener estadísticas
  async getStats(req, res) {
    try {
      const total = await Equipo.count();
      const activos = await Equipo.count({ where: { estado: 'Activo' } });
      const enReparacion = await Equipo.count({ where: { estado: 'En reparación' } });
      const tipos = await Equipo.findAll({
        attributes: ['tipo', [sequelize.fn('COUNT', sequelize.col('tipo')), 'count']],
        group: ['tipo']
      });
      
      res.json({
        total,
        activos,
        enReparacion,
        tipos,
        inactivos: total - activos - enReparacion
      });
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      res.status(500).json({ error: 'Error al obtener estadísticas' });
    }
  }
};

module.exports = equipoController;