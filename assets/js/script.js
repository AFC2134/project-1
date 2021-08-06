var trackInput = document.querySelector("#searchInput");
var searchButton = document.querySelector("#searchButton");
var topTracksEl = document.querySelector("#searchResults");
var artistLinkEl = document.querySelector("#artistLink");
var accessToken = "Bearer BQBnc9XG_qpiCXi7H1qPEpzrJaS2EUZbMeIk__Ef8EXAJR5dWT6OULRhfAUG1dVJi8pAZadMA06BXXdWdjfTMmJ9M8aqG7QlkbzvtysSP8fKev0xgPOwdR6sBlcPCD1w9qa3q6frnxk9mkoLKRNx5PnDp4dnTQA"
getArtist = function () {
    var apiUrl = "https://api.spotify.com/v1/search?q=" + trackInput.value + "&type=artist";
    var headers = {
        Authorization: accessToken,
        Accept: "application/json"
    }
    fetch(apiUrl, { headers: headers }).then(function (response) {
        console.log(response);
        return (response.json());
    }).then(function (data) {
        console.log(data);
        var artistName = data.artists.items[0].name;
        var artistId = data.artists.items[0].id;
        var artistLink = data.artists.items[0].external_urls.spotify; 
        console.log(artistId);
        console.log(artistName);
        var apiUrl = "https://api.spotify.com/v1/artists/" + artistId + "/top-tracks?market=US";
        var headers = {
            Authorization: accessToken,
            Accept: "application/json"
        }
        fetch(apiUrl, { headers: headers }).then(function (response) {
            console.log(response);
            return (response.json());
        }).then(function(data) {
        console.log(data);
        console.log(data.tracks[0].name)
        var anchor = document.createElement('a');
        var linkText = document.createTextNode("Click here to visit " + artistName + "'s page!");
        anchor.appendChild(linkText);
        anchor.title = "Click here to visit " + artistName + "'s page!";
        anchor.href = artistLink; 
        topTracksEl.innerHTML = ["Top five songs for " + artistName + ":" + data.tracks[0].name, data.tracks[1].name, data.tracks[2].name, data.tracks[3].name, data.tracks[4].name];
        artistLinkEl.appendChild(anchor);  
        })
    })
};


searchButton.addEventListener("click", getArtist);