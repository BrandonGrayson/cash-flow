// request a database instance
const request = indexedDB.open("budget", 1);

// create an object store inside the onupgradeneeded method
request.onupgradeneeded = ({target}) => {
    const db = target.result;
    const transaction = db.createObjectStore("transaction", {keypath: "transaction"})

};

// on success log the event to the console
request.onsuccess = event => {
    console.log(request.result.name)

    const objectStore = db.createObjectStore("transaction");
    objectStore.createIndex("name", "name");
    objectStore.createIndex("value", "value");
    objectStore.createIndex("date", "date");
};