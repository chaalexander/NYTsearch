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
    console.log("------------------------");
    console.log(queryURL);
    console.log("------------------------");
    console.log(numArticles);
    console.log(NYTData);
    //  clear the wells from the previous run
    $("#wellSection").empty();
    for (var i = 0; i < numArticles; i++) {
      // start dumping to HTML here

      var wellSection = $("<div>");
      var br = $("<br>");
      wellSection.addClass("well");
      wellSection.attr("id", "articleWell-" + i);
      $("#wellSection").append(wellSection);
      $("#wellSection").append(br);
      // check if things exist
      if (NYTData.response.docs[i].headline != "null") {
        console.log(NYTData.response.docs[i].headline.main);
        $("#articleWell-" + i).append(
          "<h3>" + NYTData.response.docs[i].headline.main + "</h3>"
        );
      }
      // check if the byline
      if (
        NYTData.response.docs[i].byline &&
        NYTData.response.docs[i].byline.hasOwnProperty("original")
      ) {
        console.log(NYTData.response.docs[i].byline.original);
        $("#articleWell-" + i).append(
          "<h5>" + NYTData.response.docs[i].byline.original + "</h5>"
        );
      }
      // attach the content to the appropriate well

      $("#articleWell-" + i).append(
        "<h5>" + NYTData.response.docs[i].section_name + "</h5>"
      );
      $("#articleWell-" + i).append(
        "<h5>" + NYTData.response.docs[i].pub_date + "</h5>"
      );

      $("#articleWell-" + i).append(
        " <a href= " +
          NYTData.response.docs[i].web_url +
          " > " +
          NYTData.response.docs[i].web_url +
          " </a> "
      );
      console.log(NYTData.response.docs[i].section_name);
      console.log(NYTData.response.docs[i].pub_date);
      console.log(NYTData.response.docs[i].web_url);
    }
    // the reason to console.log the queryURl is for us to be able to open the objet in a big screen and are able to see better things
  });
}
// main process
// ==================

$("#searchBtn").on("click", function() {
  // trim means is taking all the white spaces that someone has before the real search and delete.

  // get search term
  var queryTerm = $("#search")
    .val()
    .trim();
  // console.log(queryTerm);

  // add in the Search Term
  // run the query, give me 10 records of this url.
  var newURL = queryURLBase + "&q=" + queryTerm;
  // console.log(newURL);

  // get the Number of Records

  numResults = $("#numRecords").val();

  // get the start year and end year
  startYear = $("#startYear")
    .val()
    .trim();

  endYear = $("#endYear")
    .val()
    .trim();

  // only add this value in ,if there is content there if there is a number in there than begin to run the information
  if (parseInt(startYear)) {
    // add the necessary fields
    // the 0101 is to mark a date, because the users are selecting a year and the computer needs to know the day and month to start
    startYear = startYear + "0101";

    // add the date information to the URL
    newURL = newURL + "&begin_date=" + startYear + "&end_date=" + endYear;
  }
  if (parseInt(endYear)) {
    // add the necessary fields
    // the 0101 is to mark a date, because the users are selecting a year and the computer needs to know the day and month to start
    endYear = endYear + "0101";

    // add the date information to the URL
    newURL = newURL + "&end_date=" + endYear;
  }

  // console.log(newURL);

  // send the ajax call the newly assemble url
  runQuery(numResults, newURL);

  // this prevents running into a new page, like prevent default
  return false;
});

// 1. retrieve user inputs and convert to variable.
// 2. use those variables to run an AJAX call to the New York Times.
// 3. break down the NYT object into useable fields.
// 4. dynamically generate html content. that is gong to provide us the information.

// 5. dealing with "edges cases" bugs or situations that are not intuitive we were not expecting.
