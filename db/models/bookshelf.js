import mongoose from 'mongoose';

import bookshelfSchema from '../schemas/bookshelf.js';

// bookshelfSchema.index({bookName: 1, seqNo: 1}, {unique: true});

// The first param is the collection name this model represents
module.exports = mongoose.model('bookshelf', bookshelfSchema);