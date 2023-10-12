const fs = require("fs"); 
const output = './output.json';

module.exports.Run =  (input) => {
    fs.readFile(input, (error, data) => {
        if (error) {
          console.log(error);
          return;
        }
        const parsedData = JSON.parse(data); //data

        let arrCritical =[];
        let arrHigh =[];
        let arrModerate =[];
        let arrLow =[];

        let tempObjCrtitical = {}
        let tempObjHigh = {}
        let tempObjMod = {}
        let tempObjLow = {}

        let auditReportVersion = parsedData.auditReportVersion;
        let metadata = parsedData.metadata;

        const extract= Object.keys(parsedData.vulnerabilities).map((name )=> (
          (parsedData.vulnerabilities[name]['severity'] == 'critical') ? //test w/moderate
          (tempObjCrtitical[name] = parsedData.vulnerabilities[name], arrCritical.push(tempObjCrtitical)) : 
          (parsedData.vulnerabilities[name]['severity'] == 'high') ? 
          (tempObjHigh[name] = parsedData.vulnerabilities[name], arrHigh.push(tempObjHigh)) :
          (parsedData.vulnerabilities[name]['severity'] == 'moderate') ? 
          (tempObjMod[name] = parsedData.vulnerabilities[name], arrModerate.push(tempObjMod)) :
          (parsedData.vulnerabilities[name]['severity'] == 'low') ? 
          (tempObjLow[name] = parsedData.vulnerabilities[name], arrLow.push(tempObjLow)) : ''
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
          assignNewObject(arrHigh, newObj, obj)  
          write(newObj)
        }else if (arrModerate.length) {
         
          let newObj = {}
          let obj;
          assignNewObject(arrModerate, newObj, obj)  
          write(newObj)
        }else if (arrLow.length) {
         
          let newObj = {}
          let obj;
          assignNewObject(arrLow, newObj, obj)  
          write(newObj)
        }
      }
      
     execute()
     
      function assignNewObject(arr, newObj, obj) {
          obj = Object.assign({}, arr);
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