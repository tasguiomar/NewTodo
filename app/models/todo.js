var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
	userDb : String,
	text : String,
	done : Boolean
});