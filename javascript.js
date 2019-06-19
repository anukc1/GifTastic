

// function buildQueryURL() {

//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=";

//     var queryParams = { "api-key" : "w7TBvJRUGRHWa7CopemoRL8xdJGsEN7C" };

//     queryParams.q = $("#food-input")
//     .val()
//     .trim();




// console.log("------\nURL: " + queryURL + "\n--------");
// console.log (queryURL + $.param(queryParams));
// return queryURL + $.param(queryParams);
// }  
//    console.log("this is a test"); 

// function updatePage(GiphyData) {



// }

var foods = ["Pasta", "pizza", "taco"]


function renderButtons() {

  $("#button-view").empty();

  for (var i=0; i<foods.length; i++) {

    var a = $("<button>");

    a.addClass("food");

    a.attr("data-food", foods[i] );

    a.text(foods[i]);
    $("#button-view").append(a);
  }
}

renderButtons();



$("#add-food").on("click", function(event) {
  event.preventDefault();

  var food = $("#food-input").val().trim();
  foods.push(food);

  renderButtons();
});




//    // This shows the gif on clicking the button.  
       
    $(".food").on("click", function() {
        // In this case, the "this" keyword refers to the button that was clicked
        var food = $(this).attr("data-food");
  
        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          food + "&api_key=w7TBvJRUGRHWa7CopemoRL8xdJGsEN7C&limit=10";
  
        // Performing our AJAX GET request
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After the data comes back from the API
          .then(function(response) {
            // Storing an array of results in the results variable
            var results = response.data;
  
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
  
              // Only taking action if the photo has an appropriate rating
              if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                // Creating a div for the gif
                var gifDiv = $("<div>");
  
                // Storing the result item's rating
                var rating = results[i].rating;
  
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);
  
                // Creating an image tag
                var foodImage = $("<img>");
  
                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                foodImage.attr("src", results[i].images.fixed_height.url);
  
                // Appending the paragraph and foodImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(foodImage);
  
                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gif-view").prepend(gifDiv);
              }
            }
          });
      });