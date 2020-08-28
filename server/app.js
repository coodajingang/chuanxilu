const express = require('express')
const logger = require('./logging/logger')
// Database connection imports
const db = require('./db/dbConnection');

const MagicBook = require('./db/models/magicBook')
const Bookshelf = require('./db/models/bookshelf')
const History = require('./db/models/readHistory')
/************************************************************* */
// Establish database connection

const app = express()

db.dbConnection()

const port = 3000

app.get("/", (req, res) => {
    res.send("Hello world!")
})

app.get("/testdata", saveEveryDay)

app.get("/everyday", getEveryDay)

async function getEveryDay(req, res, next) {
    let response;
    let bookName = req.query.book
    let seqNo = req.query.seqno
    let openId = req.query.openid
    logger.info("GET Request [everyday] ", req.query)
    try {
        let history = await History.findOne({openId:openId})
        response = await magicBook.findOne({seqNo: 1}).exec()
        logger.info("RESONSE:", {res: response})
        return res.status(200).send(response);
    }
    catch(err) {
        logger.error("Error in getOrderDetails Controller", {meta: err});
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