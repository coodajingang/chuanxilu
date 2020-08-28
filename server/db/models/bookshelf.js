const mongoose = require('mongoose');
const bookshelfSchema = require('../schemas/bookshelf')

bookshelfSchema.index({bookName: 1}, {unique: true});

// The first param is the collection name this model represents
module.exports = mongoose.model('bookshelf', bookshelfSchema);