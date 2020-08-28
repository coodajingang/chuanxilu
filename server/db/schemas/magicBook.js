const mongoose = require('mongoose');
const validator = require('validator');

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
    chapter: { // 章节
        type: String,
        required: true
    },
    caption: { // 章节说明
        type: String,
        required: false
    },
    subHead: { // 段落
        type: String,
        required: true
    },
    content: { // 原文
      type: String,
      required: true
    },
    translate: { // 译文
        type: String,
        required: false
    },
    comment: { // 解读 注
        type: String,
        required: false
    }
})

module.exports = magicBookSchema;