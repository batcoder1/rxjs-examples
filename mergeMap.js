const Rx  =  require ("rxjs");
const operators = require('rxjs/operators')
const take = operators.take;
const map = operators.map;
const mergeMap = operators.mergeMap;
// from 2 sources, we merge and map with concurrence set to 2

const source1 = Rx.interval(500)
const timer$ = Rx.timer(1000);
const source2 = Rx.from(['a', 'b', 'c', 'd', 'e']);

const s1 = source1.pipe(take(5))

 
result = s1.pipe(
  mergeMap(val =>source2,
    (x, y) => [x, y],
    //concurrent
    2)
);


result.subscribe(x => console.log(x));