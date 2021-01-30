let db;
// request a database instance
const request = indexedDB.open("budget", 1);

// create an object store inside the onupgradeneeded method
request.onupgradeneeded = ({target}) => {
    const db = target.result;
    // create an object store with a transaction keypath
    db.createObjectStore("transaction", { autoIncrement: true });
};

// on success log the event to the console
request.onsuccess = event => {
    console.log(request.result.name)
    const objectStore = db.createObjectStore("transaction");

};