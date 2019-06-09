const Rx  =  require ("rxjs");
const operators = require('rxjs/operators')
const takeUntil = operators.takeUntil; 

// emite un numero cada 100ms hasta que el timer llega a 1seg
var source = Rx.interval(100) 
const timer$ = Rx.timer(1000);

const create = source.pipe(
    takeUntil(timer$)

)
create.subscribe(x => console.log(x));

 
