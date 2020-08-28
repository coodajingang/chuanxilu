const db = require('../db/dbConnection')

const Book = require('../db/models/bookshelf')

const logger = require('../logging/logger')

db.dbConnection()

logger.info("intit db")
console.log("init db")

let book = new Book({
    bookName: '传习录',
    author: '王阳明',
    totalChapters: 16,
    totalFragments: 301
})

async function saveBooks() {
    let currentBooks = await Book.find({bookName: book.bookName}).exec();
    if (currentBooks) {
        console.log("Query Book res: ", currentBooks)
        let delres =await Book.deleteOne({bookName: book.bookName}).exec();
        console.log("Delete res: ", delres)
    }

    let save = await book.save()
    if (!save) {
        console.log("Save error! ", save)
        return ;
    } 
    console.log("Save success!")
    let res = await Book.findOne({bookName: book.bookName}).exec();
    console.log("RES: ", res)
}

saveBooks()


// saveBooks().then(res => {
//     console.log("Save success!")
// }).catch(err => {
//     console.log("save error! ", err)
// })

// async function findBooks() {
//     return await Book.find().exec();
// }

// findBooks().then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log("find books eroro!", err)
// })

// (async () =>{
//     await Book.deleteMany().exec()
// })().then(x=>{
//     console.log("Delete success!")
// })