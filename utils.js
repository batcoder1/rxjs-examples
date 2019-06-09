const op  = require ('rxjs/operators');
const scan  = require ('rxjs/operators/scan');
 
const tap  = require ('rxjs/operators/tap');
 
const Rx = require('rxjs');

function stream(name, _delay, count, log) {
    const source = Rx.interval(_delay);

    let s = source.pipe(op.map((v) => v + `-${name}`));
    if (count !== -1) {
        s = s.pipe(op.take(count));
    }

    if (log === 'full') {
        s = s.pipe(op.tap(fullObserver(name)));
    } else if (log === 'partial') {
        s = s.pipe(op.tap(partialObserver(name)));
    }

    return s;
}
exports.stream = stream;

function fullObserver(stream) {
    return {
        next(v) {
            const message = stream.length < 5 ? `[${stream}]:\t\t${v}` : `[${stream}]:\t${v}`;
            console.log(message);
        },
        error() {
            const message = stream.length < 5 ? `[${stream}]:\t\tERROR` : `[${stream}]:\tERROR`;
            console.log(message);
        },
        complete() {
            const message = stream.length < 5 ? `[${stream}]:\t\tCOMPLETE` : `[${stream}]:\tCOMPLETE`;
            console.log(message);
        }
    }
}
exports.fullObserver = fullObserver;

function partialObserver(stream) {
    return {
        error() {
            const message = stream.length < 5 ? `[${stream}]:\t\tERROR` : `[${stream}]:\tERROR`;
            console.log(message);
        },
        complete() {
            const message = stream.length < 5 ? `[${stream}]:\t\tCOMPLETE` : `[${stream}]:\tCOMPLETE`;
            console.log(message);
        }
    }
}
exports.partialObserver = partialObserver;
 

function throwOnItem(count, stream) {
    return (source) => source.pipe(
        scan((acc, value) => [value, ...acc], []),
        map((values) => {
            if (values.length === count) {
                throw new Error(`Error on the stream '${stream}'!`);
            }
            return values[0];
        }),
        tap(partialObserver(stream))
    )
}
exports.throwOnItem = throwOnItem;
