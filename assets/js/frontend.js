$(document).ready(function () {
  console.log("frontend.js ready!");
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDFZTP39DLUwWyzNUjuEWgTcd00tyBRkVc",
    authDomain: "projectone-12b5c.firebaseapp.com",
    databaseURL: "https://projectone-12b5c.firebaseio.com",
    projectId: "projectone-12b5c",
    storageBucket: "projectone-12b5c.appspot.com",
    messagingSenderId: "237064729228"
  };
  firebase.initializeApp(config);

  var db = firebase.database();

  const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce(function (initial, item) {
        if (item) {
          var parts = item.split('=');
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
    window.location.hash = '';

    // Set token
    let _token = hash.access_token;

    const authEndpoint = 'https://accounts.spotify.com/authorize';

    // Replace with your app's client ID, redirect URI and desired scopes
    const clientId = 'b48b4e2e8c06421e862dce33a2140648';
    const redirectUri = 'https://gladavis89.github.io/projectOne/';
    const scopes = [
      'user-top-read'
    ];
    // &scope=${scopes.join('%20')}&show_dialog=true
    // If there is no token, redirect to Spotify authorization
    if (!_token) {
      window.location = `${authEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}`;
    }


  $("#submit").click(function () {

    console.log("You got music");
        $('#player').empty();
        var musicG = $("#input").val().trim() + ","+$("#artist").val().trim();
        var musicUrl = 'https://api.spotify.com/v1/search?q=' + musicG + '&type=track,artist&limit=1'
       $.ajax({
        url: musicUrl,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + _token
        },      
        success: function (playlist) {
            console.log(playlist);
            var music = playlist.tracks.items["0"].uri;
            console.log(music);
            var musicDiv = $("<div>");
            var musicIframe = $('<iframe src="https://open.spotify.com/embed?uri=' + music + '" width="300" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media">' + '</iframe>');
            $("#brand").append(musicDiv);
            musicDiv.append(musicIframe);
        },
        error: function () {
            console.log("It failed");
        }
        }); 
    });

    console.log($("#drop").val())
    console.log($("#input").val())
    var input = $('#input').val().trim();
    var option = $("#drop").val().trim();
    var artist = $("#artist").val().trim();
    var album = 'album.getInfo&album='
    var song = 'track.getInfo&track='



    $.ajax({
      url: "https://ws.audioscrobbler.com//2.0/?method=" + option + ".getInfo&artist=" + artist + "&" + option + "=" + input + "&autocorrect[0|1]&api_key=5a85a72189c33df2b02663c378c7f775&format=json",
      method: "GET"
    }).then(function (response) {
      console.log(response)
      $('#nasa-results').empty();
      console.log(response.track.wiki.published);
      $('#publication-date').text("Publication Date: " + response.track.wiki.published);

     
      console.log(response.track.album.artist);
      $('#bandName').text("Artist: " + response.track.album.artist);

      console.log(response.track.wiki.summary);
      $('#summary').text("Summary: " + response.track.wiki.summary);

      console.log(response.track.url);
      $('#databaseUrl').attr("href", response.track.url);
      $('#databaseUrl').attr("target", "_blank");
      $('#databaseUrl').text("Link to video: " + response.track.url);
  

      var regex = /^([\d]+)[\s]+([A-Za-z]+)[\s]+([\d]+)/;
      var result = response.track.wiki.published.match(regex);
      var month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(result[2]) / 3 + 1;
      if (month < 10) month = "0" + month;
      var newDate = result[3] + "-" + month + "-" + result[1];
      console.log(newDate);

      var apiKey = 'ee76wy5X0CgOS6B9Tu4yP5HV9YJ35CucnQlOB5Nz';

      var url = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey + "&date=" + newDate + "&hd=False";


      $.ajax({
        url: url,
        success: function (result) {
          if ("copyright" in result) {
            $("#copyright").text("Image Credits: " + result.copyright);
          }
          else {
            $("#copyright").text("Image Credits: " + "Public Domain");
          }

          if (result.media_type == "video") {
            $("#apod_img_id").css("display", "none");
            $("#apod_vid_id").attr("src", result.url);
          }
          else {
            $("#apod_vid_id").css("display", "none");
            $("#apod_img_id").attr("src", result.url);
          }

          $("#apod_explaination").text(result.explanation);
          $("#apod_title").text(result.title);

          // Dynamically create an 'add to favs' button:
          var addToFavsButton = $('<input>');
          addToFavsButton.attr("id", "add-to-fav-button");
          addToFavsButton.attr("type", "button");
          addToFavsButton.attr("value", "Add to Favorites");
          addToFavsButton.addClass("uk-button uk-button-primary uk-text-center uk-margin-auto");

          var nasaResultsID = $("#nasa-results");
          nasaResultsID.append(addToFavsButton);

          $('#add-to-fav-button').on("click", function (event){
            event.preventDefault();
            console.log("Add to favorites button pressed!");

            db.ref().push(result); console.log("result pushed to the database")

          });
        }// end success: function (result) {
      });

    })
  })

;

