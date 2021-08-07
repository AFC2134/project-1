var trackInput = document.querySelector("#searchInput");
var searchButton = document.querySelector("#searchButton");
var topTracksEl = document.querySelector("#searchResults");
var artistLinkEl = document.querySelector("#artistLink");
var accessToken = "Bearer BQCW8vXdRLYTcn8hnMZONWYV2rYGDeKvuoVkkJf7HOEGb-mOuYctGzznCoyRLXteiFLaQGYmtkDAeHPmPwqLTm1bW3hwZcFhRGYGC22K1Z3mOgpWZamqvRuso1tzmS3XHt2bIiHya2Jf1LNcZfy3g5vBaZ2Ykt4";
getArtist = function () {
    topTracksEl.innerHTML = "";
    artistLinkEl.innerHTML = "";

    var apiUrl = "https://api.spotify.com/v1/search?q=" + trackInput.value + "&type=artist";
    var headers = {
        Authorization: accessToken,
        Accept: "application/json"
    }
    fetch(apiUrl, { headers: headers }).then(function (response) {
        return (response.json());
    }).then(function (data) {
        var artistName = data.artists.items[0].name;
        var artistId = data.artists.items[0].id;
        var artistLink = data.artists.items[0].external_urls.spotify;
        var apiUrl = "https://api.spotify.com/v1/artists/" + artistId + "/top-tracks?market=US";
        var headers = {
            Authorization: accessToken,
            Accept: "application/json"
        }
        fetch(apiUrl, { headers: headers }).then(function (response) {
            console.log(response);
            return (response.json());
        }).then(function (data) {
            var anchor = document.createElement('a');
            var linkText = document.createTextNode("Click here to visit " + artistName + "'s page!");
            var tracksText = document.createTextNode("Top five songs for " + artistName + ":" + data.tracks[0].name + ", " + data.tracks[1].name + ", " + data.tracks[2].name + ", " + data.tracks[3].name + ", " + data.tracks[4].name);
            anchor.appendChild(linkText);
            anchor.title = "Click here to visit " + artistName + "'s page!";
            anchor.href = artistLink
            anchor.target = "_blank";
            topTracksEl.appendChild(tracksText);
            artistLinkEl.appendChild(anchor);
        })
    })
};


searchButton.addEventListener("click", getArtist);