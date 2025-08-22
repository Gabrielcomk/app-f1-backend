const pool = require('../config/db.config');

class Driver {
    static async create(newDriver) {
        const [result] = await pool.query('INSERT INTO drivers SET ?', newDriver);
        return { id: result.insertId, ...newDriver };
    }

    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM drivers');
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM drivers WHERE id = ?', id);
        return rows[0];
    }

    static async update(id, updatedDriver) {
        const [result] = await pool.query('UPDATE drivers SET ? WHERE id = ?', [updatedDriver, id]);
        return result.affectedRows > 0 ? { id, ...updatedDriver } : null;
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM drivers WHERE id = ?', id);
        return result.affectedRows > 0;
    }

    static async getByTeamId(teamId) {
        const [rows] = await pool.query('SELECT * FROM drivers WHERE team_id = ?', [teamId]);
        return rows;
    }
}

module.exports = Driver;