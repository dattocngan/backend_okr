const express = require('express');

const router = express.Router();

const isAuth = require("../../middlewares/is-auth");
const authRoute = require('./auth.route');
const objectiveRoute = require('./objective.route');
const keyResultRoute = require('./keyresult.route');

router.use('/auth', authRoute);
router.use('/objectives', isAuth, objectiveRoute);
router.use('/keyResults', isAuth, keyResultRoute);

module.exports = router;
