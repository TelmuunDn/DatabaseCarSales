// THis is the framework
// We will be using this framework to create 
//  Some logic to handle the process 
//  Of sending and recieving information 
//  From the client to the server application

// Import the express framework 
var express = require("express");

// Create the instance of the object 
// This will allow us to access the methods
var app = express();


// Import the database 
// This will allow me to connect to the database using the info 

var connection = require("./database")

// Now we need to give access to the styling and other associated files
app.use(express.static(__dirname));

// Establish a method to serve the commincation between these files
app.use(express.urlencoded({extended:true}));

// Now that the port is established we can create a response to the client 
// This get method will recieve or get the response and send it to the client 

// Now we know we can get the database information
// THis means our database is fully connected and the server reads the information
// THe next step is to connect the server to the form page 
app.get('/', function(req, res){

        // Serve the form from the client 
        // In response we pass in the location of the form
        // This way the server app gets the form from the local storage
        // and sends it to the client through a response
        // THe first argument is the location/ url of the file
//      __dirname == C:/users/user/Desktop/..
        res.sendFile(__dirname + '/form.html');

    // Get the database info 
    // Creat a variable that will contain the query
    // let sql = "SELECT * FROM mysql_table"; // this will be ran in mysql workbench
    
    // // Pass in the connection and send the information to rescieve the respons
    // connection.query(sql, function(err, results){
    //     // Catch errors and throw them 
    //     if(err) throw err; // If error throw error 
        
    //     res.send(results); // Otherwise send the results 
    // })


    // res.send("Port is working ok!");

})


// Create a POST method to send the information to the database
// WHen should this method be executed?

app.post('/submit', function(req, res){
// Any information from the form once the form is complete and submitted
// The infomation will get transmitted through the /submit path
    
    //construct the body of the request to send in the /submit
    const {firstname, lastname, userType, password} = req.body;

    // The password must be validated 

    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password)){

        // Test the pasword for a criteria 
        return res.send("Password must contain Small letters capital letters and numbers!")
        
    }
    
    if(firstname, lastname, password){

            // If all fields are present and correctly filled out 
            // we will send this information to the databse
            // So assuming now we have the correct information we need to insert his information
            // Into the db
// INSERT INTO `mysql_db`.`mysql_table` (`full_name`, `email`, `gender`, `password`) VALUES ('Tom', 'Tom', 'AA', 'Meh');
        const sql = "INSERT INTO mysql_table_2 (first_name, second_name, role, password) VALUES (?,?,?,?)";
        // ANy command from Mysql can be used as a query
        connection.query(sql, [firstname, lastname, userType, password], function(err,results){

                // if(err) throw err;
                if(err){
                    // Dtabase errors insertion errors or mismatched data types
                    console.error("Error Inserting into database: ", err);
                    // server error message
                    return res.send("Err: Could not insert information into the database!")
                }
                // if all goes ok we will do the following
                res.redirect("/home.html");
        });

    }else{
//      If the information in the form is not fully filled out 
//      We print an alert to the user
        return res.send("Please try again make sure to fill out all the information");
    }  





});


























// Create a port to establish a pathway for communication 
// This port will handle the traffic to and from the server application and client 
// TO open a port we will access the app variable
app.listen("3000", function(){

    //connect to a database and give th status
    connection.connect(function(err){
        // Catch error if error
        if(err) throw err;

        console.log("Database Connected");
    })


    // Send a message and check if the message is recieved by the client 
    console.log("App connected to port 3000"); // terminal response

})








