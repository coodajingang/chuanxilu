import mongoose from 'mongoose';
import validator from 'validator';

// 书架 
let bookshelfSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false
    },
    totalChapters: {
        type: Number,
        required: true
    },
    totalFragments: {
      type: Number,
      required: true
    },
    uploadPath: {
        type: String,
        required: false
    },
    chapterSplits: {
      type: String,
      required: false
   },
    fragmentSplits: {
        type: String,
        required: false
    }
})

module.exports = bookshelfSchema;