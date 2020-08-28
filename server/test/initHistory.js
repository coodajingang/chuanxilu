const db = require('../db/dbConnection')

db.dbConnection();

const History = require('../db/models/readHistory')

async function isexist(openId, bookName) {
    let res = await History.findOne({openId:openId, bookName: bookName}).exec() 
    if (!res) {
        console.log("Not exist!")
        return res;
    }
    console.log("Exist: ", res)
    return res;
}

isexist("231234", "asdf").then(data => {
    console.log(data)
})