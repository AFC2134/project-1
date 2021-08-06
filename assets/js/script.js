var trackInput = document.querySelector("#searchInput");
var searchButton = document.querySelector("#searchButton");

getArtist = function () {
    var apiUrl = "https://api.spotify.com/v1/artists/{0OdUWJ0sBjDrqHygGUXeCF}";
    fetch(apiUrl).then(function (response) {
        console.log(response);
    })
};
       

searchButton.addEventListener("click", getArtist);