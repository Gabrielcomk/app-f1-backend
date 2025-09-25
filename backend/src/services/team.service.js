const TeamModel = require('../models/team.model');
const DriverModel = require('../models/driver.model');

class TeamService {
    static async createTeam(teamData) {
        return TeamModel.create(teamData);
    }

    static async getAllTeamsWithDrivers() {
        const teams = await TeamModel.getAll();
        const drivers = await DriverModel.getAll();

        const teamsWithDrivers = teams.map(team => {
            const teamDrivers = drivers.filter(driver => driver.team_id === team.id).map(driver => ({
                id: driver.id,
                name: driver.name,
                is_titular: driver.is_titular === 1
            }));
            return { ...team, drivers: teamDrivers };
        });
        return teamsWithDrivers;
    }

    static async getTeamById(id) {
        return TeamModel.findById(id);
    }

    static async updateTeam(id, teamData) {
        return TeamModel.update(id, teamData);
    }

    static async deleteTeam(id) {
        return TeamModel.delete(id);
    }
}

module.exports = TeamService;