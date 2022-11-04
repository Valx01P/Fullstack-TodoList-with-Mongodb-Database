require('dotenv').config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Listdb = require("./models/list")
const connectDB = require("./config/dbConn")
const date = require(__dirname + "/date.js")
const controller = require("./controllers/controller")
const PORT = 3000

// Connect to MongoDB
connectDB()

//set view engine
app.set("view engine", "ejs")
//connection to static files in public (images&css)
app.use(express.static("public"))
//parse request to body-parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//home route
app.get("/", (request, response) => {
    const day = date.getDate();

    Listdb.find()
    .then(result => {
        response.render("index", { data: result, listTitle: day })
        })
})

//about route
app.get("/about", (request, response) => {
    response.render("about")
})

//contact route
app.get("/contact", (request, response) => {
    response.render("contact")
})

//api routes
app.post('/api/ListDB', controller.create);
app.get('/api/ListDB', controller.find);
app.put('/api/ListDB/:id', controller.update);
app.delete('/api/ListDB/:id', controller.delete);

//connections
mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB")
    app.listen(PORT, () => console.log("server is running on port " + PORT))
})
