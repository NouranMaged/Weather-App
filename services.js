/* Empty JS object to act as endpoint for all routes */
projectData = {};
/* Express to run server and routes */
const express = require("express");

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static("website"));

const port = 8000;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening() {
  console.log(server);
  console.log(`running on localhost: ${port}`);
}


let projectData = {
  data: []
}

app.post("/addData", addData);
function addData(req, res) {
  newEntry = {
    temperature: req.body.temperature,
    date: req.body.date,
    user_response: req.body.user_response,
  };
  projectData.data.push(newEntry);
  res.send(projectData);
  console.log(projectData);
}

app.get('/all',getProjectData)
function getProjectData(req,res){
  res.send(projectData)
}
