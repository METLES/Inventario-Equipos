const Equipo = require('../models/Equipo.model')

const inventarioController = {
  // Renderizar página principal con datos
  async mostrarIndex (req, res) {
    try {
      const filtros = {
        tipo: req.query.tipo,
        estado: req.query.estado,
        busqueda: req.query.busqueda
      }

      const equipos = await Equipo.getAll(filtros)
      const total = await Equipo.count()

      res.render('index', {
        equipos,
        total,
        filtros,
        mensaje: null
      })
    } catch (error) {
      console.error('Error en mostrarIndex:', error)
      res.render('index', {
        equipos: [],
        total: 0,
        filtros: {},
        mensaje: 'Error al cargar los equipos'
      })
    }
  },

  // Agregar nuevo equipo (POST desde modal)
  async agregarEquipo (req, res) {
    try {
      await Equipo.create(req.body)

      // Si es petición AJAX/Fetch
      if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        return res.json({
          success: true,
          message: '✅ Equipo agregado exitosamente'
        })
      }

      // Si es form submission normal
      res.redirect('/?mensaje=Equipo agregado exitosamente')
    } catch (error) {
      console.error('Error en agregarEquipo:', error)

      if (req.xhr) {
        return res.status(500).json({
          success: false,
          error: '❌ Error al agregar equipo'
        })
      }

      res.redirect('/?error=Error al agregar equipo')
    }
  },

  // Página About
  mostrarAbout (res) {
    res.render('about', {
      titulo: 'Acerca del Sistema',
      descripcion: 'Sistema de gestión de inventario tecnológico gubernamental'
    })
  }
}

module.exports = inventarioController