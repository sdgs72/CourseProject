const ACTIVE = "active";

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

function urldecode(str) {
  return decodeURIComponent((str + "").replace(/\+/g, "%20"));
}

chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.sync.set({
    [ACTIVE]: true,
  });
});

chrome.webRequest.onBeforeRedirect.addListener(
  (details) => {
    console.log("details", details);
    let url = details && details.url;
    let redirectUrl = details && details.redirectUrl;

    console.log("decoded URL", urldecode(url));
  },
  { urls: ["<all_urls>"] }
);

chrome.runtime.onMessage.addListener((req, sender, resp) => {
  console.log("req", req);
  console.log("sender", sender);
  console.log("resp", resp);
});
