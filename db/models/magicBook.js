import mongoose from 'mongoose';

import magicBookSchema from '../schemas/magicBook.js';

magicBookSchema.index({bookName: 1, seqNo: 1}, {unique: true});

// The first param is the collection name this model represents
module.exports = mongoose.model('magic_book', magicBookSchema);