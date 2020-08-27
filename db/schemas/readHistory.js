import mongoose from 'mongoose';
import validator from 'validator';

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
    readChapter: {
        type: Number,
        required: true
    },
    readFragment: {
      type: Number,
      required: true
    },
    today: {
        type: Date,
        required: false
    },
    todaySeqno: {
      type: Number,
      required: false
   },
    history: {
        type: String,
        required: false
    }
})

module.exports = readHistorySchema;