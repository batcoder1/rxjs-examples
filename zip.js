const Rx  =  require ("rxjs");

//wait until all observables have emitted a value then emit all as an array
let age$ = Rx.of(32, 23, 26);
let name$ = Rx.of('John', 'Paul', 'Mary');
let isDev$ = Rx.of(true, true, false);

Rx.zip(age$, name$, isDev$,
    (age, name, isDev) => ({ age, name, isDev }))
    .subscribe(x => console.log(x));
