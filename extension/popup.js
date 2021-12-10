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

  // display raw content
  chrome.storage.sync.get("summary", (items) => {
    console.log("Storage Sync get done...")
    console.log(items)
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
      innerSummaryContent.html("Nothing to display ...");
    }
  });

  var queryInput = $("#queryInput");
  var answerContent = $("#answer-content");
  var queryDisplay = $("#queryDisplayText");
  queryInput.focus();
  queryInput.on("keypress", (e) => {
    if (e.which == 13) {
      var questionText = queryInput.val()
      if(questionText == "") {
        answerContent.html("Please enter a non empty question...")
        return 
      }
      console.log(e.target.value);
      console.log("this is windows", window.location.href);
      var value = e.target.value.trim();
      queryDisplay.html(questionText)
      answerContent.html("Loading ... ")
      fetch(
        "http://localhost:5000/api/qa?" +
          new URLSearchParams({
            q: questionText,
            wiki_url: "https://en.wikipedia.org/wiki/United_States",
          }),
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      )
        .then((r) => r.text())
        .then((response) => {
          json = JSON.parse(response)
          console.log(json.result)
          answerContent.html("")
          var htmlStr = `<li>${json.result[0].text}</li>`;
          answerContent.append(htmlStr);          
        })
        .catch((err) => {
          console.log(err);
        });
        e.target.value = "";
    }
  });


});
