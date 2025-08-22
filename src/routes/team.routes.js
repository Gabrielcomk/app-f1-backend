const express = require('express');
const router = express.Router();
const TeamService = require('../services/team.service');

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: API for managing F1 teams
 */

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Create a new F1 team
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the team.
 *             example:
 *               name: Red Bull Racing
 *     responses:
 *       201:
 *         description: The created team.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The team ID.
 *                 name:
 *                   type: string
 *                   description: The team name.
 *       500:
 *         description: Server error
 *
 *   get:
 *     summary: Returns a list of all F1 teams with their drivers
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: A list of teams.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The team ID.
 *                   name:
 *                     type: string
 *                     description: The team name.
 *                   drivers:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The driver ID.
 *                         name:
 *                           type: string
 *                           description: The driver name.
 *                         is_titular:
 *                           type: boolean
 *                           description: Whether the driver is titular or reserve.
 *       500:
 *         description: Server error
 *
 * /teams/{id}:
 *   get:
 *     summary: Get an F1 team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The team ID.
 *     responses:
 *       200:
 *         description: The team description by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The team ID.
 *                 name:
 *                   type: string
 *                   description: The team name.
 *       404:
 *         description: Team not found
 *       500:
 *         description: Server error
 *
 *   put:
 *     summary: Update an F1 team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The team ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the team.
 *             example:
 *               name: Mercedes-AMG Petronas F1 Team
 *     responses:
 *       200:
 *         description: The updated team.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The team ID.
 *                 name:
 *                   type: string
 *                   description: The updated team name.
 *       404:
 *         description: Team not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete an F1 team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The team ID.
 *     responses:
 *       204:
 *         description: Team deleted successfully.
 *       404:
 *         description: Team not found
 *       500:
 *         description: Server error
 */

router.post('/', async (req, res) => {
    try {
        const newTeam = await TeamService.createTeam(req.body);
        res.status(201).json(newTeam);
    } catch (err) {
        console.error('Error creating team:', err);
        res.status(500).send('Server error');
    }
});

router.get('/', async (req, res) => {
    try {
        const teams = await TeamService.getAllTeamsWithDrivers();
        res.json(teams);
    } catch (err) {
        console.error('Error fetching teams:', err);
        res.status(500).send('Server error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const team = await TeamService.getTeamById(req.params.id);
        if (!team) {
            return res.status(404).send('Team not found');
        }
        res.json(team);
    } catch (err) {
        console.error('Error fetching team by ID:', err);
        res.status(500).send('Server error');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedTeam = await TeamService.updateTeam(req.params.id, req.body);
        if (!updatedTeam) {
            return res.status(404).send('Team not found');
        }
        res.json(updatedTeam);
    } catch (err) {
        console.error('Error updating team:', err);
        res.status(500).send('Server error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await TeamService.deleteTeam(req.params.id);
        if (!deleted) {
            return res.status(404).send('Team not found');
        }
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting team:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;