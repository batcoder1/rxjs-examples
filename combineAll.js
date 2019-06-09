const Rx = require("rxjs");
const interval = Rx.interval;
const operators = require('rxjs/operators')
const take = operators.take;
const map = operators.map;
const combineAll = operators.combineAll;


//emit every 1s, take 3
const source = interval(1000).pipe(take(3));
//map each emitted value from source to interval observable that takes 5 values
const example = source.pipe(
  map(val =>
    interval(1000).pipe(
      map(i => `Result (${val}): ${i}`),
      take(5)
    )
  )
);

const combined = example.pipe(combineAll());


combined.subscribe(val => console.log(val));