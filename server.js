const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;


// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res)=> res.send('hello world'))

require("./app/routes/personRoutes.js")(app);

app.listen(port, ()=> console.log(`app listening on port ${port}`));