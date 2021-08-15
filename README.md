# Karaoke King

## Table of Contents
* [Description](https://github.com/Blopez811/karaoke-king#description)
* [Challenges](https://github.com/Blopez811/karaoke-king#challenges)
* [Technologies Used](https://github.com/Blopez811/karaoke-king#technologies-used)
* [Contributors](https://github.com/Blopez811/karaoke-king#contributors)

## Description
This application lets you search for your favorite musical artists and provides you with their top songs and a link to their Spotify page. Once you find the songs you like, this application also allows you to find the lyrics for the songs so you can sing along. Try it out yourself here:
 https://blopez811.github.io/karaoke-king/

https://youtu.be/vhRyCaLY6nY
 ## Challenges
 The most difficult challenge we faced while creating this application was dealing with the limited API's of Spotify and Musixmatch on their free editions. Spotify required an access token to authorize fetches from its server that were time sensitive and needed to be changed approximately every hour or 10-15 calls, whichever occurred first. Musixmatch required us to use a proxy server to get around the CORS same origin errors in addition to requiring an access key. The proxy server we used, called "cors-anywhere.herokuapp.com/corsdemo", was also time sensitive and required us to request temporary service to access the server approximately every hour of use as well. When the access token and the proxy server expire the search bars get 400 errors and the results do not render. Due to the access of both of our API's being under time constraints, by the time this project will be graded they will both give 400 errors when the fetches are run. Above we have attached a video of the functioning website, as it will be functioning with a fresh access token and fresh access to the proxy server when it is submitted. For the lyrics search a modal will pop up with a copy of the link to the proxy server upon the 400 error so the user can refresh it themselves and it will run at that point. The access token for the Spotify search would have to be updated in the javascript with a new access token and the user would be unable to do that, since no user input could adjust that error, a modal stating "Artist not found!" will pop up instead to acknowledge the user pressing the submit button.

 ## Technologies Used 
 * HTML
 * CSS
 * Materialize 
 * Javascript

 ## Contributors 
 * [Benicio Lopez](https://github.com/Blopez811)
 * [Alexander Cooney](https://github.com/AFC2134)
