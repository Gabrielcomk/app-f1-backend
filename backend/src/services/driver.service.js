const DriverModel = require('../models/driver.model');

class DriverService {
    static async createDriver(driverData) {
        return DriverModel.create(driverData);
    }

    static async getAllDrivers() {
        return DriverModel.getAll();
    }

    static async getDriverById(id) {
        return DriverModel.findById(id);
    }

    static async updateDriver(id, driverData) {
        return DriverModel.update(id, driverData);
    }

    static async deleteDriver(id) {
        return DriverModel.delete(id);
    }

    static async getDriversByTeamId(teamId) {
        return DriverModel.getByTeamId(teamId);
    }
}

module.exports = DriverService;