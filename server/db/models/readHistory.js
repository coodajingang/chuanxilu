const mongoose = require('mongoose');

const readHistorySchema = require('../schemas/readHistory.js');

readHistorySchema.index({openId: 1, bookName: 1}, {unique: true});

// The first param is the collection name this model represents
module.exports = mongoose.model('read_history', readHistorySchema);