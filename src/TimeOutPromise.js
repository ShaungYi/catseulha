export default function TimeOutPromise(delay, func) {
    return new Promise((resolve) => {
        setTimeout(() => {
            func()
            resolve();
        }, delay); // Wait for 2 seconds
    });
}