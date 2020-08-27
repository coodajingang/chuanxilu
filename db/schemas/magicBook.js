import mongoose from 'mongoose';
import validator from 'validator';

let magicBookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false
    },
    seqNo: {
        type: Number,
        required: true
    },
    chapter: {
        type: String,
        required: true
    },
    content: {
      type: String,
      required: true
  },
    translate: {
        type: String,
        required: false
    }
})

module.exports = magicBookSchema;