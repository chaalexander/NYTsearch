// setup variables
// ==================

var autoKey = "7DONB0veVS0TLbQ4onmpI6nDkmYBuO0Z";
var queryTerm = " ";
var numResults = 0;
var startYear = 0;
var endYear = 0;

// url base
var queryURLBase =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + autoKey;

// variable to track number of articles
var articleCounter = 0;

// functions
// ==================

function runQuery(numArticles, queryURL) {
  //AJAX function
  $.ajax({ url: queryURL, method: "GET" }).done(function(NYTData) {
    // the reason to console.log the queryURl is for us to be able to open the objet in a big screen and are able to see better things
    console.log(queryURL);
    console.log(NYTData);
  });
}
// main process
// ==================

$("#searchBtn").on("click", function() {
  // trim means is taking all the white spaces that someone has before the real search and delete.
  var queryTerm = $("#search")
    .val()
    .trim();
  console.log(queryTerm);

  // add in the Search Term
  // run the query, give me 10 records of this url.
  var newURL = queryURLBase + "&q=" + queryTerm;
  console.log(newURL);

  // get the Number of Records

  // get the start year and end year
  startYear = $("#startYear")
    .val()
    .trim();

  endYear = $("#endYear")
    .val()
    .trim();

  newURL = newURL + "&begin_date=" + startYear + "&end_date=" + endYear;
  // send the ajax call the newly assemble url
  runQuery(10, newURL);
  // this prevents running into a new page, like prevent default
  return false;
});

// 1. retrieve user inputs and convert to variable.
// 2. use those variables to run an AJAX call to the New York Times.
// 3. break down the NYT object into useable fields.
// 4. dynamically generate html content. that is gong to provide us the information.

// 5. dealing with "edges cases" bugs or situations that are not intuitive we were not expecting.
