const db = require('../db/dbConnection')

db.dbConnection();

const MagicBook = require('../db/models/magicBook')

async function queryBooks() {
    return await MagicBook.find().exec()
}

// queryBooks().then(data => console.log(data))


(async () => {
    let count = await MagicBook.count().exec();
    console.log(count)
})()

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