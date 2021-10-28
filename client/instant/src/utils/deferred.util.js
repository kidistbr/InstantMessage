/** Implements a Deferred, a simple way to create promises. */
export class Deferred {
     promise;
     resolve;
     reject;

    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}