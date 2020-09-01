const moment = require('moment')

console.log(moment().format('YYYY-MM-DD'))


let now = moment().format('YYYY-MM-DD')
console.log(now) 
console.log(typeof(now))

let last = moment('2020-08-28', "YYYY-MM-DD")
console.log(last)
console.log(typeof(last))