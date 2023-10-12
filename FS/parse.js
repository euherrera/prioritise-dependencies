const fs = require("fs"); 
const output = './output.json';

module.exports.Run =  (input) => {
    fs.readFile(input, (error, data) => {
        if (error) {
          console.log(error);
          return;
        }
        const parsedData = JSON.parse(data); //data

       
        let tempObjCrtitical = {}
        let tempObjHigh = {}
        let tempObjMod = {}
        let tempObjLow = {}

        let auditReportVersion = parsedData.auditReportVersion;
        let metadata = parsedData.metadata;

        const extract= Object.keys(parsedData.vulnerabilities).map((name )=> (
          (parsedData.vulnerabilities[name]['severity'] == 'critical') ? //test w/moderate
          (tempObjCrtitical[name] = parsedData.vulnerabilities[name]) : 
          (parsedData.vulnerabilities[name]['severity'] == 'high') ? 
          (tempObjHigh[name] = parsedData.vulnerabilities[name]) :
          (parsedData.vulnerabilities[name]['severity'] == 'moderate') ? 
          (tempObjMod[name] = parsedData.vulnerabilities[name]) :
          (parsedData.vulnerabilities[name]['severity'] == 'low') ? 
          (tempObjLow[name] = parsedData.vulnerabilities[name]) : ''
      ))

      //console.log(tempObjHigh)
    
      const execute = () => {
        if (Object.keys(tempObjCrtitical).length){
      
          let newObj = {}
          assignNewObject(tempObjCrtitical, newObj)
          write(newObj)
        }else if (Object.keys(tempObjHigh).length) {
         
          let newObj = {}
          assignNewObject(tempObjHigh, newObj)  
          write(newObj)
        }else if (Object.keys().length) {
         
          let newObj = {}
       
          assignNewObject(tempObjMod, newObj)  
          write(newObj)
        }else if (Object.keys(tempObjLow).length) {
         
          let newObj = {}
         
          assignNewObject(tempObjLow, newObj)  
          write(newObj)
        }
      }
      
     execute()
     
      function assignNewObject(obj, newObj) {
          newObj.vulnerabilities = obj;
          newObj.auditReportVersion = auditReportVersion;
          newObj.metadata = metadata;
          newObj.createdAt = new Date().toISOString();
         
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
