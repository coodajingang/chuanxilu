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