
const Rx  =  require ("rxjs");
const operators = require('rxjs/operators')
const take = operators.take;
const merge = operators.merge;
const map = operators.map;

//emit every 2.5 seconds
const timer$ = Rx.interval(1000).pipe(take(5));
const array = ['a', 'b', 'c', 'd', 'e'];

const first$ = timer$.pipe(map(i => array[i]));

const second$ = Rx.interval(1000).pipe(take(5));


//used as instance method
const example$ = first$.pipe(merge(second$));
//output: 0,1,0,2....
example$.subscribe(val => console.log(val));