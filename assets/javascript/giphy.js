
var topics = [
    "Nicholas Cage",
    "Will Ferrel",
    "Maya rudolph",
    "Sylvester Stallone",
    "Amy Poehler",
    "Leonardo Dicaprio",
    "Tom Cruise",
    "Arnold Schwarzenegger",
    "Tina Fey",
    "Tom Hanks",
];

var stills;
var animated;
var gifStills;
var ratingsDiv;
var ratings;

// calls giphy api
function displayGIF() {
    var gifName = $(this).attr("data-name");
    var apiKey = "bXHanKHZv5S8Q9DW3cff13A6P7I0Y9io";
    var limit = 10;
    var gifRating = "PG-13"
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + gifName + "&limit=" + limit + "&offset=&rating=" + gifRating + "&lang=en";
    var ratingsArray = [];

    $("#gifs-view").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);

        for (var i = 0; i < response.data.length; i++) {
            var newDiv = $("<div>");

            animated = response.data[i].images.original.url;

            stills = response.data[i].images.original_still.url;
            gifStills = $("<img id='stillState' class='gif-display'>");
            gifStills.attr('src', stills, );
            gifStills.attr("data-state", 'still');
            newDiv.append(gifStills);
            
            ratings = response.data[i].rating;
            ratingsArray.push(ratings);
            ratingsDiv = $("<p class='ratings-text'>").text(ratings);
            newDiv.append(ratingsDiv);

            gifStills.attr("data-still", stills);
            gifStills.attr("data-animated", animated);
            gifStills.attr("data-rating", ratings);

            $("#gifs-view").append(newDiv);
        } // Closes 'for-loop'

        console.log(ratingsArray);
        console.log(response);

    }); //closes response function
} // Closes displayGIF function

function renderButtons() {
    // delets buttons before adding new ones
    $("#gifButtons").empty();
    // loops through array of topics and then creates a button for each actor in the 'topics' array
    for (var i = 0; i < topics.length; i++) {
        var buttons = $("<button>");
        buttons.addClass("btn btn-primary");
        buttons.attr("data-name", topics[i]);
        buttons.text(topics[i]);
        $("#gifButtons").append(buttons);
    }
}

$("#add-actor").on("click", function (event) {
    event.preventDefault();
    var newActor = $("#actor-input").val().trim();
    topics.push(newActor);
    renderButtons();
    $("#actor-input").val("");


});

$(document).on("click", ".btn", displayGIF);

$(document).on("click", ".gif-display", function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr('src', $(this).attr("data-animated"))
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr('src', $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }


});

renderButtons();
console.log(topics);