import mongoose from 'mongoose';

import readHistorySchema from '../schemas/readHistory.js';

readHistorySchema.index({openId: 1}, {unique: true});

// The first param is the collection name this model represents
module.exports = mongoose.model('read_history', readHistorySchema);