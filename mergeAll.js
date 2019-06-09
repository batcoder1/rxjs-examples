const utils = require ('./utils');
const Rx  =  require ("rxjs");

const operators = require('rxjs/operators')
const mergeAll = operators.mergeAll;
const take = operators.take;
const map = operators.map;
 

const a = utils.stream('a', 100, 5);
const b = utils.stream('b', 100, 5);
const c = utils.stream('c', 100, 5);
 
const h = Rx.interval(100).pipe(take(3), map(i => [a, b, c][i]));
 

h.pipe(mergeAll()).subscribe(utils.fullObserver('mergeAll'));

