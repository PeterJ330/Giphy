
var topics = {
    firstName: ["Nicholas",
        "Will",
        "Maya",
        "Sylvester",
        "Amy",
        "Leonardo",
        "Tom",
        "Arnold",
        "Tina",
        "Tom"],
    lastName: ["Cage",
        "Ferrel",
        "rudolph",
        "Stallone",
        "Poehler",
        "Dicaprio",
        "Cruise",
        "Schwarzenegger",
        "Fey",
        "Hanks"],
}
console.log(topics);

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
    // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=" + apiKey + "&tag=" + gifName + "&limit=" + limit + "&offset=&rating=" + gifRating + "&lang=en";
    var ratingsArray = [];

    $("#gifs-view").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);

        for (var i = 0; i < response.data.length; i++) {
            var newDiv = $("<div>");
            var imageHolder = $("<div>");
            imageHolder.attr('id', 'holder');

            animated = response.data[i].images.original.url;

            stills = response.data[i].images.original_still.url;
            gifStills = $("<img id='stillState' class='gif-display'>");
            gifStills.attr('src', stills, );
            gifStills.attr("data-state", 'still');
            imageHolder.append(gifStills);

            ratings = response.data[i].rating;
            ratingsArray.push(ratings);
            // ratingsDiv = $("<p class='ratings-text'>").text(ratings);
            ratingsDiv = $("<div class='ratings-text'>").text(ratings);                        
            imageHolder.append(ratingsDiv);

            gifStills.attr("data-still", stills);
            gifStills.attr("data-animated", animated);
            gifStills.attr("data-rating", ratings);


            newDiv.append(imageHolder);
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
    for (var i = 0; i < topics.firstName.length; i++) {
        var fullName = topics.firstName[i] +"+"+ topics.lastName[i];
        var textName = topics.firstName[i] +" "+ topics.lastName[i];

        var buttons = $("<button>");
        buttons.addClass("btn btn-primary");
        buttons.attr('id', topics.firstName[i]+" "+topics.lastName[i]);
        // buttons.attr("data-name", topics.firstName[i]+"+"+topics.lastName[i]);
        buttons.attr('data-name', fullName);
        buttons.text(textName);
        $("#gifButtons").append(buttons);
    }
}

$("#add-actor").on("click", function (event) {
    event.preventDefault();
    var newFirstName = topics.firstName;
    var newLastName = topics.lastName;
    var newActor = $("#actor-input").val().trim();
    var newActorArray = newActor.split(" ");
    newFirstName.push(newActorArray[0]);
    newLastName.push(newActorArray[1]);

    renderButtons();
    $("#actor-input").val("");
});

$(document).on("click", ".btn", displayGIF);

// when gif is clicked, changes from still to animated or vice versa
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