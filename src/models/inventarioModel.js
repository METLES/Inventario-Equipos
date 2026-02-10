const pool = require('./inventarioModel');

class Equipo {
    // Obtener todos los equipos con filtros
    static async getAll(filtros = {}) {
        let sql = 'SELECT * FROM equipos WHERE 1=1';
        const params = [];

        if (filtros.tipo && filtros.tipo !== 'Tipo de equipo') {
            sql += ' AND tipo = ?';
            params.push(filtros.tipo);
        }

        if (filtros.estado && filtros.estado !== 'Todos los estados') {
            sql += ' AND estado = ?';
            params.push(filtros.estado);
        }

        if (filtros.busqueda) {
            sql += ' AND (asset_id LIKE ? OR tipo LIKE ? OR procesador LIKE ? OR sistema_operativo LIKE ? OR departamento LIKE ?)';
            const busquedaTerm = `%${filtros.busqueda}%`;
            params.push(busquedaTerm, busquedaTerm, busquedaTerm, busquedaTerm, busquedaTerm);
        }

        sql += ' ORDER BY fecha_adquisicion DESC';

        try {
            const [rows] = await pool.promise().query(sql, params);
            return rows;
        } catch (error) {
            console.error('Error en Equipo.getAll:', error);
            throw error;
        }
    }

    // Crear nuevo equipo (desde el modal)
    static async create(data) {
        const sql = `
            INSERT INTO equipos 
            (asset_id, tipo, procesador, ram, sistema_operativo, version_so,
             pantalla, almacenamiento, departamento, estado, fecha_adquisicion, notas)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const params = [
            data.assetId,
            data.tipo,
            data.procesador,
            data.ram || null,
            data.so,
            data.version,
            data.pantalla,
            data.storage || null,
            data.departamento,
            data.estado,
            data.fecha,
            data.notas || null
        ];

        try {
            const [result] = await pool.promise().query(sql, params);
            return { id: result.insertId, ...data };
        } catch (error) {
            console.error('Error en Equipo.create:', error);
            throw error;
        }
    }

    // Contar total de equipos
    static async count() {
        const [rows] = await pool.promise().query('SELECT COUNT(*) as total FROM equipos');
        return rows[0].total;
    }
}

module.exports = Equipo;