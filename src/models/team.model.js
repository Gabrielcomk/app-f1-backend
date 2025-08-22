const pool = require('../config/db.config');

class Team {
    static async create(newTeam) {
        const [result] = await pool.query('INSERT INTO teams SET ?', newTeam);
        return { id: result.insertId, ...newTeam };
    }

    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM teams');
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM teams WHERE id = ?', id);
        return rows[0];
    }

    static async update(id, updatedTeam) {
        const [result] = await pool.query('UPDATE teams SET ? WHERE id = ?', [updatedTeam, id]);
        return result.affectedRows > 0 ? { id, ...updatedTeam } : null;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM teams WHERE id = ?', id);
        return result.affectedRows > 0;
    }
}

module.exports = Team;