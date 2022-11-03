require('dotenv').config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const List = require("./models/list")
const connectDB = require("./config/dbConn")
const PORT = 3000

// Connect to MongoDB

connectDB()

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get("/", (request, response) => {
    List.find()
    .then(result => {
        response.render("index", { data: result })
        console.log(result)
    })
})

//getting list data to MongoDB

app.post("/", (request, response) => {
	const list = new List({
		list: request.body.inputValue
	})
	list.save()
	.then(result => {
		response.redirect("/")
	})
})

//deleting list data from MongoDB

app.delete("/:id", (request, response) => {
    List.findByIdAndDelete(request.params.id)
    .then(result => {
        console.log(result)
    })
})

mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB")
    app.listen(PORT, () => console.log("server is running on port " + PORT))
})
