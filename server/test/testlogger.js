const logger = require('../logging/logger.js')


 let req = {
   name: '1223',
   age: 18 
 }

logger.info("test %d %s", 18, 'name', {x:req})
logger.info("asdfasdf", {name:'1234', req: req})