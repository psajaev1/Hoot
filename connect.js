<<<<<<< HEAD
const url = "http://localhost:3000/";

function getAsync(endpoint, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     return callback(this.response);
    }
  };
  xhttp.open("GET", url + endpoint, true);
  xhttp.send();
}

function postAsync(endpoint, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     return callback(this.response);
    }
  };
  xhttp.open("POST", url + endpoint, true);
  xhttp.send();
}

function isValid() {
  console.log("goood");

}
=======

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:cis400@hoot-data.mpvxy.mongodb.net/Hoot-Data?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log("**********************");
  // perform actions on the collection object
  client.close();
});
>>>>>>> 6c6b9a3da7e974fc7051cb10fc4cb405a72a8bd5
