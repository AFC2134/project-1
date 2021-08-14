var trackInput = document.querySelector("#searchInput");
var searchButton = document.querySelector("#searchButton");
var topTracksEl = document.querySelector("#searchResults");
var artistLinkEl = document.querySelector("#artistLink");
var modal = document.querySelector("#myModal");
var span = document.querySelector(".close");
var accessToken = "Bearer BQBW2vKcyfNyQ6SLJ3rWvOzA8B74D_ps8ylaMISkZTJJXLPKRXh24OJKBsuoY5zUSVLdnHqaNxkvBKd4TFGdA8kq7YKYe5ZOQw0zsI8LdtwYHmp2soLjAfZ7xTGqPPKDofrk2zj1SyQ1_LKtbdenFoTadrgft-8";

getArtist = function () {
    console.log('here!!')
    topTracksEl.innerHTML = "";
    artistLinkEl.innerHTML = "";
    var apiUrl = "https://api.spotify.com/v1/search?q=" + trackInput.value + "&type=artist";
    var headers = {
        Authorization: accessToken,
        Accept: "application/json"
    }
    fetch(apiUrl, { headers: headers }).then(function (response) {
        if (response.ok) {
            return (response.json());
        } else {
            modal.style.display = "block";
            console.log("showModal function 1 fired");
            return
        }
    }).then(function (data) {
        if (data.artists.total === 0) {
            modal.style.display = "block";
            console.log("showModal function 3 fired");
            return
        }

        var artistName = data.artists.items[0].name;
        var artistId = data.artists.items[0].id;
        var artistLink = data.artists.items[0].external_urls.spotify;
        var apiUrl = "https://api.spotify.com/v1/artists/" + artistId + "/top-tracks?market=US";
        var headers = {
            Authorization: accessToken,
            Accept: "application/json"
        }
        fetch(apiUrl, { headers: headers }).then(function (response) {
            if (response.ok) {
                return (response.json());
            }
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

var closeModal = function () {
    modal.style.display = "none";
}

searchButton.addEventListener("click", getArtist);
span.addEventListener("click", closeModal)

//Begin the musicx api logic
var musicxInput = document.querySelector("#eventField");
var musicxBtn = document.querySelector("#eventSearch");
var accessKey = "d11b6b82c9f6b2a47b420a9de513631e"
var lyricsResultsEl = document.querySelector("#lyricsResultsEl")
var getLyrics = function () {
    lyricsResultsEl.innerHTML = "";
    console.log("getLyrics fired");
    var apiUrl = "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track_artist=" + musicxInput.value + "&apikey=" + accessKey;
    console.log(musicxInput.value);

    fetch(apiUrl, { mode: "cors" }).then(function (response) {
        return response.json()

    }).then(function (data) {
        console.log(data);
        if(data.message.header.status_code != 200) {
            alert("Lyrics not found try again!")
            return
        }
        var trackId = data.message.body.track_list[0].track.track_id;
        console.log(trackId);

        var apiUrl = "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + trackId + "&apikey=" + accessKey;

        fetch(apiUrl, { mode: "cors" }).then(function (response) {
            return response.json()

        }).then(function (data) {
            if(data.message.header.status_code != 200) {
                alert("Lyrics not found try again!")
                return
            }
            var lyrics = data.message.body.lyrics.lyrics_body + data.message.body.lyrics.lyrics_copyright
            console.log(lyrics)
            console.log(data);
            lyricsResultsEl.innerHTML = lyrics
        })
    })
}

div.image {
    content:url("..\\images\\john-matychuk-gUK3lA3K7Yo-unsplash (1).jpg");
 }
musicxBtn.addEventListener("click", getLyrics)