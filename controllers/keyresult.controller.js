const KeyResult = require("../models/keyresult");

//Delete objective
exports.deleteKeyResult = async (req, res, next) => {
    try {
        const id = req.params.id;

        const keyResult = await KeyResult.findOne({_id: id})
            .populate({
                path: 'objectiveId',
                select: 'userId',
                populate: {
                    path: 'userId',
                    select: '_id'
                }
            });

        if (keyResult.objectiveId.userId._id.toString() !== req.user._id.toString()) {
            const error = new Error('Not allowed!');
            error.statusCode = 401;
            throw error;
        }

        await KeyResult.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Deleted successfully!'
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
