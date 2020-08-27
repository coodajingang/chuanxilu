const Book = require('./db/models/bookshelf')

let book = new Book({
  bookName: '传习录',
  author: '王阳明',
  totalChapters: 16,
  totalFragments: 301
})


async function test() {
  await book.save();
}

test().then(x => {
  console.log('success');
})