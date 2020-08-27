import express from 'express'
import logger from './logging/logger'
// Database connection imports
import db from './db/dbConnection';

import magicBook from './db/models/magicBook'
/************************************************************* */
// Establish database connection
db.dbConnection();

const app = express()

const port = 3000

app.get("/", (req, res) => {
    res.send("Hello world!")
})

app.get("/testdata", saveEveryDay)

app.get("/everyday", getEveryDay)

async function getEveryDay(req, res, next) {
    let response;
    try {
        response = await magicBook.findOne({seqNo: 1}).exec()
        logger.info("RESONSE:", {res: response})
        return res.status(200).send(response);
    }
    catch(err) {
        logger.error("Error in getOrderDetails Controller", {meta: err});
        return res.status(404).send({httpStatus: 404, status: "failed", errorDetails: err});
    }
};

async function saveEveryDay(req, res, next) {
    let response;
    try {
        let book = new magicBook({
            seqNo: 1,
            bookName: "chuanxilu",
            author: "wangyangming",
            chapter: "aiwen",
            content: "alsldfla;s;df;a;sdfasdf",
            translate: "askkxkallalsdlfasdf"
        })
        response = await book.save()
        logger.info("save RESONSE:", {res: response})
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