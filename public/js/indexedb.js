// request a database instance
const request = indexedDB.open("budget", 1);

request.onsuccess = event => {
    console.log(request.result.name)
}