app.post('/submit', function(req,res){

    // once the form is completed it will get transmitted through the /submit path
    
         const{fullname, email, gender, country, password, confirmPassword} = req.body;
    
    // body of the request to be sent in the submit
    
          if(!password == confirmPassword){
    
    // check if the two password fields match and give a response if they do not
    
           return res.send("The password fields do not match!!!")
    
           }
    
          if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password)){
    
    // Test the password for regex 
            return res.send("Password must contain Small letters capital letters and numbers!")
            
        }
    
          if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
    
    // test the email input with regex
    
          return res.send("Please check your email address and try again!")
    
        }
    
         if(!/[^a-zA-Z]+/.test(fullname){
    
    // check the full name input with regex
    
         return res.send("Please make sure you have only letters in your name and try again!")
    
    }
    
    
    
    )
    
          if(fullname, email, gender, country, password){
    
    // add the values to the sql_table in my server
    
          const sql = "INSERT INTO mysql_table (fullname, email, gender,country, password) VALUES (?,?,?,?,?)";
    
    // and if we run into an error writing into the database, throw an error
    
          connection.query(sql, [fullname, email, gender, country, password], function(err,results){
    
           if(err){
    
             console.error("Error inserting into database: ", err);
    
             return res.send("Err: Could not insert information into database")
    
                  }
    
    // if all goes well redirect us to the home page
    
              res.redirect("/home.html");
    
                       });
    
          }else{
    
    // if the one or more of the fields dont have value send out an error message
    
          return res.send("Please try again and make sure to fill out all the information")
    
          }
    
    
    
    });