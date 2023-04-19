//This will connect the config file that links MongoDB and Mongoose to the rules for each of the dbs we create

require('../config/connection');

module.exports = {
    Books: require ('./Books'),
    User: require ('./Users')

}