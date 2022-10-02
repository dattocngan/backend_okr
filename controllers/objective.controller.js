const Objective = require('../models/objective');
const KeyResult = require('../models/keyresult');

//Get all objectives
exports.getObjectives = async (req, res, next) => {
    try {
        const result = await Objective
            .find({userId: req.user})
            .populate('keyResults');

        res.status(200).json({
            objectives: result
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//Get an objective by id
exports.getObjective = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await Objective.findOne({
            _id: id,
            userId: req.user
        }).populate('keyResults');

        if (!result) {
            const error = new Error('Cannot find the objective!');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            objective: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//Create objective
exports.createObjective = async (req, res, next) => {
    try {
        const {type, content, reason, status, deadlineAt, keyResults} = req.body;

        const objective = await Objective.create({
            type: type,
            content: content,
            reason: reason,
            status: status,
            deadlineAt: deadlineAt,
            userId: req.user
        });

        keyResults.forEach(keyResult => {
            keyResult.objectiveId = objective._id;
        });

        await KeyResult.create(keyResults);

        res.status(201).json({
            message: "Created successfully!"
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//Edit objective
exports.editObjective = async (req, res, next) => {
    try {
        const id = req.params.id;
        const objective = await Objective.findOne({
            _id: id,
            userId: req.user
        });

        if (!objective) {
            const error = new Error('Cannot find the objective!');
            error.statusCode = 404;
            throw error;
        }

        const {type, content, reason, status, deadlineAt, keyResults} = req.body;

        objective.type = type || objective.type;
        objective.content = content || objective.content;
        objective.reason = reason || objective.reason;
        objective.status = status || objective.status;
        objective.deadlineAt = deadlineAt || objective.deadlineAt;

        await objective.save();

        for (const keyResult of keyResults) {
            if (keyResult._id) {
                await KeyResult.updateOne({_id: keyResult._id}, keyResult);
            } else {
                await KeyResult.create({
                    ...keyResult,
                    objectiveId: objective._id
                });
            }
        }

        res.status(200).json({
            message: "Updated successfully!"
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//Delete objective
exports.deleteObjective = async (req, res, next) => {
    try {
        const id = req.params.id;
        const objective = await Objective.findOne({
            _id: id,
            userId: req.user
        });

        if (!objective) {
            const error = new Error('Cannot find the objective!');
            error.statusCode = 404;
            throw error;
        }

        await Promise.all([Objective.findByIdAndDelete(id), KeyResult.deleteMany({objectiveId: id})]);

        res.status(200).json({
            message: "Deleted successfully!"
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
