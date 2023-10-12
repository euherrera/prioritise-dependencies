const fs = require("fs"); 
const output = './output.json';

module.exports.Run =  (input) => {
    fs.readFile(input, (error, data) => {
        if (error) {
          console.log(error);
          return;
        }
        const parsedData = JSON.parse(data);
        let arrCritical =[];
        let arrHigh =[];
        let tempObj = {}
        let auditReportVersion = parsedData.auditReportVersion;
        let metadata = parsedData.metadata;

        const extract= Object.keys(parsedData.vulnerabilities).map((name )=> (
          (parsedData.vulnerabilities[name]['severity'] == 'critical') ? //test w/moderate
          (tempObj[name] = parsedData.vulnerabilities[name], arrCritical.push(tempObj)) : 
          (parsedData.vulnerabilities[name]['severity'] == 'high') ? 
          (tempObj[name] = parsedData.vulnerabilities[name], arrHigh.push(tempObj)) : ''
      ))

      const execute = () => {
        if (arrCritical.length){
      
          let newObj = {}
          let obj = {}
          assignNewObject(arrCritical, newObj, obj)
          write(newObj)
        }else if (arrHigh.length) {
         
          let newObj = {}
          let obj;
          assignNewObject(tempObj, newObj, obj)  
          write(newObj)
        }
      }
      
     execute()
     
      function assignNewObject(arr, newObj, obj) {
          obj = Object.assign({}, arr);
          newObj.vulnerabilities = obj;
          newObj.auditReportVersion = auditReportVersion;
          newObj.metadata = metadata;
          //newObj.createdAt = new Date().toISOString();
         
      }


      function write(newObj) {
        fs.writeFile(output, JSON.stringify(newObj, null, 2), (err) => {
          if (err) {
            console.log('Failed to write updated data to file');
            return;
          }
          console.log(newObj);
          console.log('Updated file successfully');
          
          
        });
      }
       
      });
    
}