var db = require('./db');

module.exports = {
	begin:db.Connection.transaction, // function(err,done)
	rollback:db.Connection.rollbackTransaction // function(err)
}