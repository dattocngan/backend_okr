const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let objectiveSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    deadlineAt: {
        type: Date,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
    id: false
});

objectiveSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

objectiveSchema.virtual('keyResults', {
    ref: 'KeyResult',
    localField: '_id',
    foreignField: 'objectiveId'
})

module.exports = mongoose.model('Objective', objectiveSchema);
