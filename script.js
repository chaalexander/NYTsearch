var queryUrl =
  "https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=vAdxUTqkKH5s1ouI01HPjprikTicXGm8";

$.ajax({
  url: queryUrl,
  method: "GET"
}).then(function(response) {
  console.log(response);
  // functions for the search and clear results btn
  $("#run-search").on("click", function(e) {
    e.preventDefault();
    // $("#article-section").text()
    
    var newDiv= $("<div>");


    console.log("you click me ");
  });

  $("#clear-all").on("click", function(e) {
    e.preventDefault();
    console.log("you click me");
  });
});
