const EventEmitter = require('events'); //class bult in class
const input = require("./input"); 

class EEExtended extends EventEmitter {
    execute(data) {
      this.emit('begin');
      console.time('execute');
      
        this.emit('run', data);
       
      
      console.timeEnd('execute');
      this.emit('end');
    }
  }
  
  
module.exports = EEExtended;