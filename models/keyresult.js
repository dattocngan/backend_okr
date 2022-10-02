const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const keyResultSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    target: {
        type: Number,
        required: true
    },
    currentAchievement: {
        type: Number,
        default: 0
    },
    unit: {
        type: String,
        required: true
    },
    deadlineAt: {
        type: Date,
        required: true
    },
    objectiveId: {
        type: Schema.Types.ObjectId,
        ref: 'Objective'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('KeyResult', keyResultSchema);
