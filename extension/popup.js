$(document).ready(function () {
  var queryInput = $("#queryInput");
  queryInput.focus();
  queryInput.on("keypress", (e) => {
    if (e.which == 13) {
      console.log(e.target.value);
      var value = e.target.value;
      $("#queryDisplay span").html(value.trim());
    }
  });
});
