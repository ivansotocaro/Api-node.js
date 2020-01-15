const sql = require('./db.js');

const Person = function(person){
    this.name = person.name;
    this.age = person.age;
    this.document = person.document
};

Person.create = (newPerson, result) => {
    sql.query('INSERT INTO person SET ?', newPerson, (err, res)=>{
        if(err){
            console.log('error' , err);
            result(err, null);
            return;
        }

        console.log('Created person: ', {id: res.insertId, ...newPerson});
        result(null, {id: res.insertId, ...newPerson})
    });
}

Person.findById = (personId, result)=>{
    sql.query(`SELECT * FROM person WHERE id = ${personId}`, (err, res)=>{
        if(err){
            console.log('error: ', err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log('found person: ', res[0]);
            result(null, res[0]);
            return;
        }

        // not found person width the id
        result({kind: "not_found"}, null);
    });
};

Person.getAll = result =>{
    sql.query('SELECT * FROM person', (err, res) => {
        if(err){
            console.log('error' , err);
            result(null, err);
            return;
        }

        console.log('person : ', res);
        result(null, res);
    });
};

Person.updateById = (idPerson, person, result)=>{
    sql.query(
        'UPDATE person SET name = ?, age = ?, document = ? WHERE id = ?', 
        [person.name, person.age, person.document, idPerson],
        (err, res)=>{
            if(err){
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated person: ", { id: idPerson, ...person });
            result(null, {  id: idPerson, ...person });
        }
        
        );
};


Person.remove = (id, result) => {
    sql.query("DELETE FROM person WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted person with id: ", id);
      result(null, res);
    });
};
  

Person.removeAll = result => {
    sql.query("DELETE FROM person", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} person`);
      result(null, res);
    });
};

module.exports = Person;

