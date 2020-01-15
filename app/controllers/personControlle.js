const Person = require('../models/personModel.js');

//Create and save a new person
exports.create = (req, res)=>{
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    //create a Person
    const person = new Person({
        name: req.body.name,
        age : req.body.age,
        document: req.body.document
    });

    //Save person in the database
    Person.create(person, (err, data)=>{
        if(err)
            res.status(500).send({
                message: 
                err.message || 'Some error ocurred while craeting the person'
            });
        else res.send(data);    
    });
};

//Retrieve all person from the database
exports.findAll = (req, res)=>{
    Person.getAll((err, data)=>{
        if(err)
            res.status(500).send({
                message: 
                    err.message || 'Some error occurred while retrieving persons'
            });
        else res.send(data);    
    })
};

//Find a single person with a personId
exports.findOne = (req, res)=>{
    Person.findById(req.params.personId, (err, data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found person with id ${req.params.personId}.`
                });
            }else{
                res.status(500).send({
                   message: `Error retrieving person with id ${req.params.personId}.` 
                });
            }
        }else res.send(data);
    });
};

//update a person identified by the personId in the request
exports.udpate = (req, res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({
            message: 'Connect can not be empty!'
        });
    }

    Person.updateById(req.params.personId, 
        new Person(req.body), 
        (err, data)=>{
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: 'Not found person with id' + req.params.personId
                    });
                }else{
                    res.status(500).send({
                        message: 'Error updating person with id' + req.params.personId
                    });
                }
            }else res.send(data)
        }
    );
};

//Delete a person with the spicified personId in the request
exports.delete = (req, res)=>{
    Person.remove(req.params.personId, (err, data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found person with id ${req.params.personId}.`
                });
            }else{
                res.status(500).send({
                   message: `Error deleting person with id ${req.params.personId}.` 
                });
            }
        }else res.send({message: 'person was deleted succesfully!'});
    });
};

// Delete all Persons from the database.
exports.deleteAll = (req, res) => {
    Person.removeAll((err, data)=>{
        if(err)
            res.status(500).send({
                message: 
                    err.message || 'some error ocurred while removing all persons'
            });
        else res.send({message: 'All persons were deleted succesfully!'})
        
    })
};

