const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const listSchema = new Schema({
	list: {
		type: String,
		required: true
		}
	})

const Listdb = mongoose.model("listdb", listSchema)
module.exports = Listdb

//or you could write it as module.exports = mongoose.model("List", listSchema)