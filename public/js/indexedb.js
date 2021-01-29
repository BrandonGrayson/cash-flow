// request a database instance
const request = indexedDB.open("budget", 1);


// create an object store inside the onupgradeneeded method
request.onupgradeneeded = ({target}) => {
    const db = target.result;
    const objectStore = db.createObjectStore("Data")
};

// on success log the event to the console
request.onsuccess = event => {
    console.log(request.result.name)
};