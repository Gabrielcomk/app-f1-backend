const express = require('express');
const router = express.Router();
const DriverModel = require('../models/driver.model');

/**
 * @swagger
 * tags:
 *   name: Drivers
 *   description: API for managing F1 drivers
 */

/**
 * @swagger
 * /drivers:
 *   post:
 *     summary: Create a new F1 driver
 *     tags: [Drivers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the driver.
 *               team_id:
 *                 type: integer
 *                 description: The ID of the team the driver belongs to.
 *               is_titular:
 *                 type: boolean
 *                 description: Whether the driver is titular or reserve.
 *             example:
 *               name: Max Verstappen
 *               team_id: 1
 *               is_titular: true
 *     responses:
 *       201:
 *         description: The created driver.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The driver ID.
 *                 name:
 *                   type: string
 *                   description: The driver name.
 *                 team_id:
 *                   type: integer
 *                   description: The ID of the team the driver belongs to.
 *                 is_titular:
 *                   type: boolean
 *                   description: Whether the driver is titular or reserve.
 *       500:
 *         description: Server error
 *
 *   get:
 *     summary: Returns a list of all F1 drivers
 *     tags: [Drivers]
 *     responses:
 *       200:
 *         description: A list of drivers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The driver ID.
 *                   name:
 *                     type: string
 *                     description: The driver name.
 *                   team_id:
 *                     type: integer
 *                     description: The ID of the team the driver belongs to.
 *                   is_titular:
 *                     type: boolean
 *                     description: Whether the driver is titular or reserve.
 *       500:
 *         description: Server error
 *
 * /drivers/{id}:
 *   get:
 *     summary: Get an F1 driver by ID
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The driver ID.
 *     responses:
 *       200:
 *         description: The driver description by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The driver ID.
 *                 name:
 *                   type: string
 *                   description: The driver name.
 *                 team_id:
 *                   type: integer
 *                   description: The ID of the team the driver belongs to.
 *                 is_titular:
 *                   type: boolean
 *                   description: Whether the driver is titular or reserve.
 *       404:
 *         description: Driver not found
 *       500:
 *         description: Server error
 *
 *   put:
 *     summary: Update an F1 driver by ID
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The driver ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the driver.
 *               team_id:
 *                 type: integer
 *                 description: The updated ID of the team the driver belongs to.
 *               is_titular:
 *                 type: boolean
 *                 description: Whether the driver is titular or reserve.
 *             example:
 *               name: Sergio Perez
 *               team_id: 1
 *               is_titular: true
 *     responses:
 *       200:
 *         description: The updated driver.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The driver ID.
 *                 name:
 *                   type: string
 *                   description: The updated driver name.
 *                 team_id:
 *                   type: integer
 *                   description: The updated ID of the team the driver belongs to.
 *                 is_titular:
 *                   type: boolean
 *                   description: Whether the driver is titular or reserve.
 *       404:
 *         description: Driver not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete an F1 driver by ID
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The driver ID.
 *     responses:
 *       204:
 *         description: Driver deleted successfully.
 *       404:
 *         description: Driver not found
 *       500:
 *         description: Server error
 */

router.post('/', async (req, res) => {
    try {
        const newDriver = await DriverModel.create(req.body);
        res.status(201).json(newDriver);
    } catch (err) {
        console.error('Error creating driver:', err);
        res.status(500).send('Server error');
    }
});

router.get('/', async (req, res) => {
    try {
        const drivers = await DriverModel.getAll();
        res.json(drivers);
    } catch (err) {
        console.error('Error fetching drivers:', err);
        res.status(500).send('Server error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const driver = await DriverModel.findById(req.params.id);
        if (!driver) {
            return res.status(404).send('Driver not found');
        }
        res.json(driver);
    } catch (err) {
        console.error('Error fetching driver by ID:', err);
        res.status(500).send('Server error');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedDriver = await DriverModel.update(req.params.id, req.body);
        if (!updatedDriver) {
            return res.status(404).send('Driver not found');
        }
        res.json(updatedDriver);
    } catch (err) {
        console.error('Error updating driver:', err);
        res.status(500).send('Server error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await DriverModel.delete(req.params.id);
        if (!deleted) {
            return res.status(404).send('Driver not found');
        }
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting driver:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;