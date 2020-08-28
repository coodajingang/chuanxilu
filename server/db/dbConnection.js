const mongoose = require('mongoose');
const config = require('config');
const logger = require('../logging/logger');

let dbConnection;

let getDBConnection = async() => {
    try {
        let connectionOptions = {
            user: config.get('mongodb_settings.user'),
            pass: config.get('mongodb_settings.pwd'),
            dbName: config.get('mongodb_settings.dbname'),
            useNewUrlParser: config.get('mongodb_settings.use_new_url_parser'),
            useCreateIndex: config.get('mongodb_settings.use_create_index')
        }

        // Establish a mongoose connection to mongodb
        dbConnection = await mongoose.connect(config.get('mongodb_settings.url'), connectionOptions, (error) => {
                        if (error) {
                            logger.error("Could not establish connection to database", {meta: error})
                            return;
                        }
                        logger.info("MongoDB connection was successful");
                    });
    }
    catch(err) {
        logger.error("Error connecting to the database", {meta: err})
    }
    return dbConnection;
}

// Initializing the models and registering them to their models
// require("./models/tariffRate");
// require("./models/productCategory");
// require("./models/product")
// require("./models/user");

// Exporting the connection
module.exports.dbConnection = () => getDBConnection();
