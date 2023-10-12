

const EEExtended = require('./eeExtended'); 
const Parse = require('./parse');
const input = './input.json';


const eeExtended = new EEExtended(); //instance of imported extended class

eeExtended.on('begin', () => console.log('About to execute'));
eeExtended.on('run', () => Parse.Run(input))
eeExtended.on('end', () => console.log('Done with execute'));
eeExtended.execute(input);

//console.log(module)







  
  
  
  
  
  
  
  
  
  
  
