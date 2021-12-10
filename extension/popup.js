var spinnerHtml = `<div class="spinner-grow text-primary" role="status">
<span class="sr-only">Loading...</span>
</div>`;

$(document).ready(function () {
  $("#refresh").on("click", function (e) {
    chrome.storage.sync.set({ refresh: true });
    location.reload();
  });

  $("#clear-btn").on("click", function (e) {
    chrome.storage.sync.clear();
    console.log("cleared!");
    chrome.storage.sync.set({
      active: true,
      refresh: false,
      q: "",
      wiki_url: "",
      answers: {},
      summary: {
        result: "",
      },
    });
    location.reload();
  });

  // display raw content
  chrome.storage.sync.get(null, (items) => {
    var storageContent = items;
    $("#raw-content").append(
      "<pre>" + JSON.stringify(storageContent, null, 2) + "</pre>"
    );

    if (items.q) {
      $("#queryDisplay span").html(items.q);
    }

    var innerSummaryMsg = $("#inner-summary-message");
    var innerSummaryContent = $("#inner-summary-content");
    var imageContent = $("#inner-image-content #flex");

    if (items.summary && items.summary.result) {
      innerSummaryMsg.addClass("d-none");
      innerSummaryContent.html(items.summary.result);

      if (items.summary.images) {
        items.summary.images.forEach((e) => {
          var htmlStr = `<a href="${e}" target="_blank"><img src="${e}"" style="width: 200px" class="img-thumbnail"></img></a>`;
          imageContent.append(htmlStr);
        });
      }
    } else {
      innerSummaryMsg.removeClass("d-none");
      innerSummaryContent.html(spinnerHtml);
    }
  });

  var queryInput = $("#queryInput");
  var answerContent = $("#answer-content");
  var answerSpinner = $("#answer-spinner");
  queryInput.focus();
  queryInput.on("keypress", (e) => {
    if (e.which == 13) {
      console.log(e.target.value);
      console.log("this is windows", window.location.href);
      var value = e.target.value.trim();
      $("#queryDisplay span").html(value);
      chrome.storage.sync.set({
        q: value,
      });
      e.target.value = "";
      answerContent.html("");
      answerSpinner.removeClass("d-none");
    }
  });

  chrome.storage.sync.get(["answers"], (e) => {
    if (e.answers && e.answers.result) {
      console.log("e.answers", e.answers);
      e.answers.result.forEach((a) => {
        var htmlStr = `<li>${a.text}</li>`;
        answerContent.append(htmlStr);
      });
    }
  });

  chrome.storage.sync.get(["summary"], (e) => {
    if (e.summary && e.summary.result) {
      queryInput.prop("disabled", false);
    } else {
      queryInput.prop("disabled", true);
    }
  });

  chrome.storage.sync.onChanged.addListener((changes, areaName) => {
    console.log("changes popu.js", changes);
    if (!changes) return;
    if (changes.wiki_url || changes.summary) {
      location.reload();
    }

    if (changes.answers) {
      answerSpinner.addClass("d-none");
      chrome.storage.sync.get(["answers"], (e) => {
        if (e.answers && e.answers.result) {
          console.log("e.answers", e.answers);
          e.answers.result.forEach((a) => {
            var htmlStr = `<li>${a.text}</li>`;
            answerContent.html(htmlStr);
          });
        }
      });
    }
  });
});
