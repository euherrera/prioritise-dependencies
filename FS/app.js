//app.js
//const EventEmitter = require('events'); 
const EEExtended = require('./eeExtended'); 
const input = './input.json';
const Parse = require('./parse');

const eventEmitter = new EEExtended(); //instance of imported extended class
  
eventEmitter.on('begin', () => console.log('About to execute')); //listen
eventEmitter.on('run', () => Parse.Run(input)) //listen
eventEmitter.on('end', () => console.log('Done with execute')); //listen
eventEmitter.execute(input); //make a sound