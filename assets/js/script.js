var trackInput = document.querySelector("#searchInput");
var searchButton = document.querySelector("#searchButton");
var topTracksEl = document.querySelector("#searchResults");
var artistLinkEl = document.querySelector("#artistLink");
var modal = document.querySelector("#myModal");
var span = document.querySelector(".close");
var accessToken = "Bearer BQBoFykQRFnDO9aLa8fSj71CZdqsqAJEMOSh2i_e2GP6ODjf0wAXZHJM7e_TUHrvlhaCq8B3bffiucbvELHyG2doJ7XGFrApr5UtVmT5r5Lym45ZJKpjLvtjI3WzeEvGzBB1_L5NulnZB3t6LcQZrtLhurdUWDo";

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
var accessKey = "f43c43e67f94e25a7be4cdc688e4bd35"
var lyricsResultsEl = document.querySelector("#lyricsResultsEl");
var lyricModal = document.querySelector("#lyricModal");
var lyricSpan = document.querySelector(".lyricClose")

var getLyrics = function () {
    lyricsResultsEl.innerHTML = "";
    var apiUrl = "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track_artist=" + musicxInput.value + "&apikey=f43c43e67f94e25a7be4cdc688e4bd35";
    console.log(musicxInput.value);

    fetch(apiUrl, { mode: "cors" }).then(function (response) {
        return response.json()

    }).then(function (data) {
        console.log(data);
        if(data.message.header.status_code != 200) {
            console.log("Lyrics not found try again!")
            return
        }
        else{
            lyricModal.style.display = "block";
            musicxInput.value = "Type song and artist name";
        }
        var trackId = data.message.body.track_list[0].track.track_id;
        console.log(trackId);

        var apiUrl = "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + trackId + "&apikey=f43c43e67f94e25a7be4cdc688e4bd35";

        fetch(apiUrl, { mode: "cors" }).then(function (response) {
            return response.json()

        }).then(function (data) {
            if(data.message.header.status_code != 200) {
                alert("Lyrics not found try again!")
                return
            }
            var lyrics = data.message.body.lyrics.lyrics_body
            console.log(lyrics)
            console.log(data);
            lyricsResultsEl.innerHTML = lyrics

            //If no results found show modal
            if(lyricsResultsEl.innerHTML == ""){
                console.log();
                lyricModal.style.display = "block";
            }
        })

        
    })
}


musicxBtn.addEventListener("click", getLyrics)
lyricSpan.addEventListener("click", closeModal)