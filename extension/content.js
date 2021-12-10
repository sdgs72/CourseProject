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
  console.log("getting hit " + currUrl);
  var doc = window.document;
  console.log(doc);
  // chrome.storage.sync.set({
  //   wiki_url: currUrl,
  // });

  // fetch(
  //   "http://localhost:5000/api/summary?" +
  //     new URLSearchParams({
  //       wiki_url: currUrl,
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
  //     console.log("content.js fetch result", result);
  //     result &&
  //       chrome.storage.sync.set({
  //         summary: JSON.parse(result),
  //       });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
}

$(document).ready(() => {
  let currUrl = window.location.href;
  console.log("currUrl", currUrl);
  if (currUrl.includes("wikipedia.org/wiki")) {
    console.log("getting hit " + currUrl);
    var doc = window.document;
    console.log(doc);
    chrome.storage.sync.set({
      wiki_url: currUrl,
    });

    fetch(
      "http://localhost:5000/api/summary?" +
        new URLSearchParams({
          wiki_url: currUrl,
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
        console.log("content.js fetch result", result);
        result &&
          chrome.storage.sync.set({
            summary: JSON.parse(result),
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  chrome.storage.sync.onChanged.addListener((changes, areaName) => {
    console.log(changes);
    if (
      changes.answers &&
      changes.answers.newValue &&
      changes.answers.newValue.result &&
      changes.answers.newValue.result[0].text
    ) {
      var paragraphs = document.querySelectorAll("p");
      console.log(paragraphs);
      paragraphs.forEach((p) => {
        console.log(p);

        if (p.innerText.includes(changes.answers.newValue.result[0].text)) {
          p.style.backgroundColor = "pink";
          $([document.documentElement, document.body]).animate(
            {
              scrollTop: $(p).offset().top - 200,
            },
            1000
          );
          // p.scrollIntoView();
        }
      });
    }

    if (changes && changes.refresh) {
      chrome.storage.sync.set({ refresh: false });
      window.location.reload();
    }
  });
});
