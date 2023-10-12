const express = require('express');
const app = express();
const fs = require("fs");

fs.readFile("../FS/output.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  
    app.get('/', async (req, res)=> {
      try{
        await res.send(jsonString);
        console.log("File data:", jsonString);
      }catch(error){
        console.log("Error:", error);
      }
    
  })
 
  
});

app.listen(3000, () => console.log('Listening on port 3000'))