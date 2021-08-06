var trackInput = document.querySelector("#searchInput");
var searchButton = document.querySelector("#searchButton");

getArtist = function () {
    var apiUrl = "https://api.spotify.com/v1/search?q=" + trackInput.value + "&type=artist";
    var headers = {
        Authorization: "Bearer BQAgai_F3COLcngzJasiaA0MFrAJp0aWWKO-Y4b1YQ_k4D6v5_WkThdraWye6fgKp7l3YJM9JySLX1Xs16EZNrADoeMSVaciYzTJp5yheYGOytpygpJWW_8M3sfkmu9CYwM8Q5R9QQATo82b5HlSuxxxDOekukU",
        Accept: "application/json"
    }
    fetch(apiUrl, { headers: headers }).then(function (response) {
        console.log(response);
        return (response.json());
    }).then(function (data) {
        console.log(data);

        var artistId = data.artists.items[0].id;
        console.log(artistId);
        var apiUrl = "https://api.spotify.com/v1/artists/" + artistId + "/top-tracks?market=US";
        var headers = {
            Authorization: "Bearer BQAgai_F3COLcngzJasiaA0MFrAJp0aWWKO-Y4b1YQ_k4D6v5_WkThdraWye6fgKp7l3YJM9JySLX1Xs16EZNrADoeMSVaciYzTJp5yheYGOytpygpJWW_8M3sfkmu9CYwM8Q5R9QQATo82b5HlSuxxxDOekukU",
            Accept: "application/json"
        }
        fetch(apiUrl, { headers: headers }).then(function (response) {
            console.log(response);
            return (response.json());
        }).then(function(data) {
        console.log(data);
        })
    })
};


searchButton.addEventListener("click", getArtist);