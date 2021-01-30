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
    db = event.target.result;
    console.log ("Navigor being simulated ---->----->")
    // check if app is online before reading from db
    if (navigator.onLine) {
        console.log("navigator online")
    }
};

request.onerror = event => {
    console.log("Houston We have a problem------>", event.target.errorCode)
};

function saveTransaction (transaction) {
    // create a transaction on the pending db with readwrite access
    const transaction = db.transaction(["transaction"], "readwrite");

    // access transaction object store
    const store = transaction.objectStore("transaction");

    // add transaction to store with add method
    store.add(transaction);
};

