const Listdb = require('../models/list');
//crud functions
//api

// create and save new listitem
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new listitem, new instance of database schema
    const listitem = new Listdb({
        note : req.body.note //accessing from listform.ejs from a NAME with the VALUE of NOTE
    })

    // saves listitem in the database
    listitem
        .save(listitem)
        .then(data => {
            // res.send(data)
            res.redirect('/');
        }) //to find any errors vvv
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all listitems/ retrieve and return a single listitem
exports.find = (req, res)=>{

    if(req.query.id){  //returns specific list value if id is specified
        const id = req.query.id; //accessing from listform.ejs from a NAME with the VALUE of ID

        Listdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Could not find listitem with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving listitem with id " + id})
            })

    }else{  //returns all list values if no id value is specified
        Listdb.find()
            .then(listitem => {
                res.send(listitem)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving listitem information" })
            })
    }

    
}

// Update a new idetified listitem by listitem id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Listdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update listitem with ${id}. Maybe listitem not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update listitem information"})
        })
}

// Delete a listitem with specified listitem id in the request
exports.delete = (req, res)=>{//delete specific list value if id is specified
        const id = req.params.id; //accessing from listform.ejs from a NAME with the VALUE of ID

        Listdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "listitem was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete listitem with id=" + id
            });
        });

    // }else{  //delete all list values if no id value is specified
        // Listdb.deleteMany()
        // .then(data => {
        //     if(!data){
        //         res.status(404).send({ message : `Could not clear listdata`})
        //     }else{
        //         res.send({
        //             message : "List has been successfully cleared"
        //         })
        //     }
        // })
        //     .catch(err =>{
        //         res.status(500).send({
        //             message : "Error could not delete"
        //         })
        //     })
    }


exports.deleteAll = (req, res)=>{ //delete every list item
//delete all list values when no id value is specified
        Listdb.deleteMany()
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Could not clear listdata`})
            }else{
                res.send({
                    message : "ALL list data has been successfully cleared"
                })
            }
        })
            .catch(err =>{
                res.status(500).send({
                    message : "Error could not delete"
                })
            })
    }
