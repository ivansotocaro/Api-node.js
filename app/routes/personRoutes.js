module.exports = app =>{
    const person = require('../controllers/personControlle.js');

    //Create a new person
    app.post('/person', person.create);

    //Retrieve all person
    app.get('/person', person.findAll);

    //Retrive a single person with id
    app.get('/person/:personId', person.findOne);

    //Update a person with id 
    app.put('/person/:personId', person.udpate);

    //Delete a person with id
    app.delete('/person/:personId', person.delete);

    //Delete all person
    app.delete('/person', person.deleteAll);
}