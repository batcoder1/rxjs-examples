const Rx  =  require ("rxjs");
const operators = require('rxjs/operators')
const take = operators.take;
const map = operators.map;
const filter = operators.filter; 
const buffer = operators.buffer; 
const events = [
  
  ]
  for (let i=0; i< 100; i++){
    events.push('event'+i)
    if (i>1 && i % 10 === 0) {
      events.push('ready')

    }
} 
//  we buffer events until ready event arrives.
const events$ = Rx.interval(500).pipe(
  take(events.length),    
  map(i => events[i]),
  )


const condition$ = events$.pipe(
  filter(event => event == 'ready'),
  
)

const buffered$ = events$.pipe(
  filter(event => event != 'ready'),
  buffer(condition$),
 
  
)


buffered$.subscribe(val => console.log(val));