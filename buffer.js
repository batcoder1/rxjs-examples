const Rx  =  require ("rxjs");
const operators = require('rxjs/operators')
const bufferTime = operators.bufferTime; 

const source1 = Rx.interval(100);
const mybuffer = source1.pipe(
    bufferTime(1000));

    mybuffer.subscribe(val =>
  console.log('Buffered 1seg:', val)
);