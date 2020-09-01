const express = require('express')
const path = require('path');
const logger = require('./logging/logger')
// Database connection imports
const db = require('./db/dbConnection');

const MagicBook = require('./db/models/magicBook')
const Bookshelf = require('./db/models/bookshelf')
const History = require('./db/models/readHistory');

const moment = require('moment')
/************************************************************* */
// Establish database connection

const app = express()

db.dbConnection()

const port = 3000

app.get("/", (req, res) => {
    res.send("Hello world!")
})

app.use(express.static(path.join(__dirname, 'public')));

app.get("/everyday", getEveryDay)

async function getEveryDay(req, res, next) {
    let response;
    let bookName = req.query.book
    let seqNo = req.query.seqno
    let openId = req.query.openid
    logger.info("GET Request [everyday] ", req.query)
    try {
        if (!openId) {
            logger.info("No openid found!")
            return res.status(200).send("No User!")
        }
        if (!bookName) {
            //logger.info("No BookName found!")
            //return res.status(200).send("No Book name!")
            bookName = "传习录"
        }
        let bookShelf = await Bookshelf.findOne({bookName: bookName}).exec();
        if (!bookShelf) {
            logger.info("No found book ")
            return res.status(200).send("No found book!")
        } 
        let total = bookShelf.totalFragments 
        if (!total || total <= 0) {
            logger.info("Book %s has no sections ", bookName)
            return res.status(200).send("No found book section!")
        }

        let history  = await History.findOne({openId: openId, bookName: bookName}).exec()
        if (!history) {
            logger.info("Register history %s %s ", openId, bookName)
            let regHistory = new History({
                bookName: bookName,
                openId: openId,
                name: openId,
                readChapter: 0,
                readFragment: 0,
                history: []
            })
            await regHistory.save();
            history = await History.findOne({openId:openId, bookName: bookName}).exec();
        }
        let seqNo = history.todaySeqno
        let today = moment().format('YYYY-MM-DD')
        if (today === history.today) {
            ;
        } else {
            do {
                seqNo = Math.ceil(Math.random() * total ) + 1
            } while (seqNo in history.history)
            history.history.push(seqNo)
            history.today = today
            history.todaySeqno = seqNo 
            await history.save();
        }
        
        logger.info("SeqNO: %d", seqNo)

        response = await MagicBook.findOne({seqNo: seqNo}).exec()
        logger.info("RESONSE: ", {response: response})
        return res.status(200).send(response);
    }
    catch(err) {
        logger.error("Error in get everyday", {meta: err});
        return res.status(404).send({httpStatus: 404, status: "failed", errorDetails: err});
    }
};

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

app.listen(port, ()=> console.log(`Express Server listening on port ${port}!`))