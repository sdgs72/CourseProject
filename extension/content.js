function getAllStorageSyncData() {
  // Immediately return a promise and start asynchronous work
  return new Promise((resolve, reject) => {
    // Asynchronously fetch all data from storage.sync.
    chrome.storage.sync.get(null, (items) => {
      // Pass any observed errors down the promise chain.
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      // Pass the data retrieved from storage down the promise chain.
      resolve(items);
    });
  });
}

let currUrl = window.location.href;
console.log("currUrl", currUrl);
if (currUrl.includes("wikipedia.org/wiki")) {
  console.log("getting hit" + currUrl);
  var doc = window.document;
  console.log(doc);

  // fetch("http://localhost:5000/api/process", {
  //   method: "POST",
  //   headers: new Headers({
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "https://foo.example",
  //     "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  //     "Access-Control-Allow-Headers": "X-PINGOTHER, Content-Type",
  //     "Access-Control-Max-Age": "86400",
  //   }),
  //   body: JSON.stringify({
  //     document: currUrl,
  //     question: "who is barack obama",
  //   }),
  // })
  //   .then((r) => r.text())
  //   .then((result) => {
  //     console.log("result", result);
  //   });
}
