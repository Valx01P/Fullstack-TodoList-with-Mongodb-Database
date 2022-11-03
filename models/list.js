const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const listSchema = new Schema({
	list: {
		type: String,
		required: true
		}
	})

const list = mongoose.model("List", listSchema)
module.exports = list

//or you could write it as module.exports = mongoose.model("List", listSchema)