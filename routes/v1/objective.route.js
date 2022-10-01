const express = require('express');

const router = express.Router();

const objectiveController = require('../../controllers/objective.controller');

// Get all objectives
router.get('/', objectiveController.getObjectives);

//Get objective by id
router.get('/:id', objectiveController.getObjective);

//Create new objective
router.post('/', objectiveController.createObjective);

//Edit objective
router.put('/:id', objectiveController.editObjective);

//Delete objective
router.delete('/:id', objectiveController.deleteObjective);

module.exports = router;
