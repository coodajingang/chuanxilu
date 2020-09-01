const mongoose = require('mongoose');
const validator = require('validator');

// 书架 
let readHistorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nickName: {
      type: String,
      required: false
    },
    openId: {
        type: String,
        required: true
    },
    bookName: {
        type: String,
        required: true
    },
    readChapter: {
        type: Number,
        required: false
    },
    readFragment: {
      type: Number,
      required: false
    },
    today: {
        type: String,
        required: false
    },
    todaySeqno: {
      type: Number,
      required: false
   },
    history: {
        type: [Number],
        required: false
    }
})

module.exports = readHistorySchema;