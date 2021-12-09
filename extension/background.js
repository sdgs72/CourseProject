const ACTIVE = "active";
const WIKI_PAGE_URL_INDICATOR = "wikipedia.org/wiki";

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

chrome.runtime.onInstalled.addListener((details, tab) => {
  chrome.storage.sync.set({
    active: true,
    q: "",
    wiki_url: "",
    answers: {},
    summary: {},
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab && tab.url && tab.url.includes(WIKI_PAGE_URL_INDICATOR)) {
    console.log("onUpdated", tab, tab.url);
    // chrome.storage.sync.set({
    //   wiki_url: tab.url,
    // });
    // fetch(
    //   "http://localhost:5000/api/summary?" +
    //     new URLSearchParams({
    //       wiki_url: tab.url,
    //     }),
    //   {
    //     method: "GET",
    //     headers: new Headers({
    //       "Content-Type": "application/json",
    //     }),
    //   }
    // )
    //   .then((r) => r.text())
    //   .then((result) => {
    //     console.log(result);
    //     result &&
    //       chrome.storage.sync.set({
    //         summary: JSON.parse(result),
    //       });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
});

chrome.storage.sync.onChanged.addListener((changes, areaName) => {
  console.log("changes", changes);
  console.log("areaName", areaName);
  if (!changes) return;
  if (changes.q && changes.q.newValue != changes.q.oldValue) {
    chrome.storage.sync.get(["q", "answers", "wiki_url"], (e) => {
      fetch(
        "http://localhost:5000/api/qa?" +
          new URLSearchParams({
            q: changes.q.newValue,
            wiki_url: e.wiki_url,
          }),
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      )
        .then((r) => r.text())
        .then((result) => {
          console.log("answers", result);
          result &&
            chrome.storage.sync.set({
              answers: JSON.parse(result),
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
});

// chrome.storage.sync.get(["q", "answers", "wiki_url"], (e) => {
//   console.log("q e", e);

//   if (e.answers) return;
//   if (e.wiki_url == "" || q == "") return;

//   console.log("q e after", e);

// fetch(
//   "http://localhost:5000/api/qa?" +
//     new URLSearchParams({
//       q: e.q,
//       wiki_url: e.wiki_url,
//     }),
//   {
//     method: "GET",
//     headers: new Headers({
//       "Content-Type": "application/json",
//     }),
//   }
// )
//   .then((r) => r.text())
//   .then((result) => {
//     console.log(result);
//     result &&
//       chrome.storage.sync.set({
//         answers: JSON.parse(result),
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// });

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
