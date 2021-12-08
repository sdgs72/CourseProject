$(document).ready(function () {
  $("#clear-btn").on("click", function (e) {
    chrome.storage.sync.clear();
    console.log("cleared!");
    chrome.storage.sync.set({
      active: true,
      q: "",
      wiki_url: "",
      answers: {},
      summary: {
        result: "",
      },
    });
    location.reload();
  });
  var queryInput = $("#queryInput");
  queryInput.focus();
  queryInput.on("keypress", (e) => {
    if (e.which == 13) {
      console.log(e.target.value);
      console.log("this is windows", window.location.href);
      var value = e.target.value.trim();

      chrome.storage.sync.set({
        q: value,
      });
      
      location.reload();
    }
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
    if (items.summary && items.summary.result) {
      innerSummaryMsg.addClass("d-none");
      innerSummaryContent.html(items.summary.result);
    } else {
      innerSummaryMsg.removeClass("d-none");
      innerSummaryContent.html("Nothing to display ...");
    }

    var answerContent = $("#answer-content");
    if (items.answers && items.answers.result) {
      console.log("items.answers", items.answers);
      items.answers.result.forEach((a) => {
        var htmlStr = `<li>${
          a.text
        }<code class="ml-2">score: </code>${a.score.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}</li>`;
        answerContent.append(htmlStr);
      });
    }
  });
});
