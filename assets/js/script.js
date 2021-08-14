var trackInput = document.querySelector("#searchInput");
var searchButton = document.querySelector("#searchButton");
var topTracksEl = document.querySelector("#searchResults");
var artistLinkEl = document.querySelector("#artistLink");
var modal = document.querySelector("#myModal");
var span = document.querySelector(".close");
var accessToken = "Bearer BQBJvTjl9OMi28bLuFuphfRaxa8uNIKwfD3JBseihacg248xedvhF08aSdWh-Qd1Sx2ddbKFy2VmqW3zXYrSNlCQ81ojQFFFkubPdGsU_VP_sMPRAQWcgPLuWKAvpNNeSJf8Cg404B-DHaO02XKofMdSaUuR4dY";

getArtist = function () {
    localStorage.setItem("artist", trackInput.value);
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
    localStorage.setItem("lyricsSearch", musicxInput.value);
    lyricsResultsEl.innerHTML = "";
    console.log("getLyrics fired");
    var apiUrl = "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track_artist=" + musicxInput.value + "&apikey=" + accessKey;
    console.log(musicxInput.value);

    fetch(apiUrl, { mode: "cors" }).then(function (response) {
        if (response.ok) {
            return (response.json());
        } else {
            var modalText = document.querySelector("#modalText");
            modalText.textContent = "Sorry Your Temporary Server expired, try refreshing here https://cors-anywhere.herokuapp.com/corsdemo"
            modal.style.display = "block";
            return   
        }

    }).then(function (data) {
        console.log(data);
        if(data.message.header.status_code != 200) {
            modalText.textContent = "Lyrics Not Found!"
            modal.style.display = "block";
            return
        }
        if(data.message.body.track_list.length == 0) {
            modalText.textContent = "Lyrics Not Found!"
            modal.style.display = "block";
            return
            
        }
        var trackId = data.message.body.track_list[0].track.track_id;
        console.log(trackId);

        var apiUrl = "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + trackId + "&apikey=" + accessKey;

        fetch(apiUrl, { mode: "cors" }).then(function (response) {
            return response.json()

        }).then(function (data) {
            if(data.message.header.status_code != 200) {
                modalText.textContent = "Lyrics Not Found!"
                modal.style.display = "block"
                return
            }
            var lyrics = data.message.body.lyrics.lyrics_body + data.message.body.lyrics.lyrics_copyright;
            lyricsResultsEl.innerHTML = lyrics
        })
    })
}


musicxBtn.addEventListener("click", getLyrics)