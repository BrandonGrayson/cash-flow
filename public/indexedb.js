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
        checkDatabase()
    }
};

request.onerror = event => {
    console.log("Houston We have a problem------>", event.target.errorCode)
};

function saveRecord (record) {
    // create a transaction on the pending db with readwrite access
    const transaction = db.transaction(["transaction"], "readwrite");

    // access transaction object store
    const store = transaction.objectStore("transaction");

    // add transaction to store with add method
    store.add(record);
};

function checkDatabase () {
    // open transaction on budget db
    const transaction = db.transaction(["transaction"], "readwrite");
    // access transaction object store
    const store = transaction.objectStore("transaction");
    // get all rectords from store and set to var
    const getAll = store.getAll();

    // get all function
    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(() => {
                // if successful, open a transaction on pending db
                const transaction = db.transaction(["transaction"], "readwrite");
                // access transaction object store
                const store = transaction.objectStore("transaction")
                // clear all items in store
                store.clear()
            });
        }
    };
};

// listen for app coming back online
window.addEventListener("online", checkDatabase)
