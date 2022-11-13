# Fullstack-TodoList-with-Mongodb-Database
A todolist made using node.js&amp;express.js as well as having data saved in mongodb/mongoose and to a lesser extent local storage with dynamically rendered data using ejs

You can run this todolist on localhost:3000 if you'd like
Some environmental variables I left out would be the
DATABASE_URI
which would just contain your mongodb connection string, if your unfamiliar with what that is, it would look similar to this;
ex.
DATABASE_URI=mongodb+srv://    v      :        v       @       v      .mongodb.net/   v   ?retryWrites=true&w=majority
                        # yourusername    password        clustername            databasename
                        
If you wondering how I setup my mongodb well I just went with the default cluster0 name, called my database ListDB, and called my collection listdbs

To install the necessary packages and dependencies, I believe you simply type in your command terminal "npm install"
Then finally you can start the project on localhost:3000, for me I just put in the command terminal "npm start nodemon" to begin this process,
you may change that if you wish

--------------------------------------------------------------------
So to recap,

step 1:
command terminal "npm install"

step 2:
*create file;   ".env"
*within file;   ".env"
*write;          DATABASE_URI= *your connection string*

step 3:
command terminal "npm start nodemon"

--------------------------------------------------------------------

I hope these instructions are of help and use to you, excuse me if I overexplained
also, I'm not an expert at coding yet, so since this is one of my first major projects
it may be confusing to understand, I hope my comments ease that confusion, my future
projects will be much clearer

finally,
*use the source-code however you like :)*
