const express = require('express');

const router = express.Router();

const keyResultController = require('../../controllers/keyresult.controller');

//Delete a specific keyResult
router.delete('/:id', keyResultController.deleteKeyResult);

module.exports = router;
