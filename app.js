const express = require('express'); // Importing the Express framework
const bodyParser = require('body-parser'); // Middleware for parsing incoming request bodies
const request = require('request'); // Simplified HTTP client for making requests
const https = require('https'); // Built-in HTTPS module for making secure requests

const app = express(); // Creating an instance of Express

app.use(bodyParser.urlencoded({ extended: true })); // Allowing parsing of URL-encoded bodies
app.use(express.static('public')); // Serving static files from the 'public' directory

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/signup.html'); // Sending the 'signup.html' file when accessing the root URL
});

app.post('/', function (req, res) {
  const firstName = req.body.fname; // Extracting the value of 'fname' from the request body
  const lastName = req.body.lname; // Extracting the value of 'lname' from the request body
  const email = req.body.email; // Extracting the value of 'email' from the request body

  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data); // Converting the data object to JSON string
  const apiKey = '9c9498304b4eec2d833dfd0ad7e9afca-us9'; // API key for authentication
  const listId = '24de4cc4c7'; // ID of the mailing list
  const url = `https://us9.api.mailchimp.com/3.0/lists/${listId}`; // MailChimp API URL
  const options = {
    method: 'POST',
    auth: `user:${apiKey}` // Setting the authentication credentials
  };

  const request = https.request(url, options, function (response) {
    response.on('data', function (data) {
      console.log(JSON.parse(data)); // Logging the response data from the MailChimp API
    });

    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html'); // Sending the 'success.html' file if the request is successful
    } else {
      res.sendFile(__dirname + '/error.html'); // Sending the 'error.html' file if the request encounters an error
    }
  });

  request.write(jsonData); // Sending the JSON data in the request body
  request.end(); // Ending the request
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Server is running on port 3000'); // Starting the server on port 3000
});






// const express = require('express');
// const bodyParser = require("body-parser");
// const request = require("request");
// const https = require('https');
// const app = express();

// app.use(bodyParser.urlencoded({extended: true}));

// // by this express.static we can use css file & img
// app.use(express.static("public"));

// app.get("/", function(req,res){
//     res.sendFile(__dirname + "/signup.html");
// });

// app.post("/",function(req,res){  
    
//     const firstName = req.body.fname;
//     const lastName = req.body.lname;
//     const email = req.body.email;
//     const data = {
//         member: [
//             {
//                 email_address: email,
//                 status: "pending",
//                 merge_fields: {
//                     FNAME: firstName,
//                     LNAME: lastName
//                 }
//             }
//         ]
//     };

//     const jsonData = JSON.stringify(data);
//     // const appId = "9c9498304b4eec2d833dfd0ad7e9afca-us9";

//     const url = "https://us9.api.mailchimp.com/3.0/lists/24de4cc4c7";
//     const options = {
//         method: "POST",
//         auth: "9c9498304b4eec2d833dfd0ad7e9afca-us9"
//     }
//     const request = https.request(url, options, function(response){
//         response.on("data",function(data){
//             console.log(JSON.parse(data));
//         })
//     });
//     request.write(jsonData);
//     request.end();
//     // res.send("<h1>Server is up and running.</h1>")

// });


// app.listen(3000, function(){
//     console.log("Server is running on port 3000");
// });
