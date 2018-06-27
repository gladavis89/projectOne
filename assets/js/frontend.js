<<<<<<< HEAD
$(document).ready(function () {
  console.log("frontend.js ready!");

  $("#submit").click(function () {

    console.log($("#drop").val())
    console.log($("#input").val())
    var input = $('#input').val()
    var option = $("#drop").val()
    var artist = $("#artist").val()
    var album = 'album.getInfo&album='
    var song = 'track.getInfo&track='



    $.ajax({
      url: "http://ws.audioscrobbler.com//2.0/?method=" + option + ".getInfo&artist=" + artist + "&" + option + "=" + input + "&autocorrect[0|1]&api_key=5a85a72189c33df2b02663c378c7f775&format=json",
      method: "GET"
    }).then(function (response) {
      console.log(response)

      console.log(response.track.wiki.published);
      $('#publication-date').text("Publication Date: " + response.track.wiki.published);

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

        }// end success: function (result) {
      });

    })
  })

});
=======
$("#submit").click(function(){

console.log($("#drop").val())
console.log($("#input").val())
var input = $('#input').val().trim();
var option = $("#drop").val().trim();
var artist = $("#artist").val().trim();
var album = 'album.getInfo&album='
var song = 'track.getInfo&track='



$.ajax({
  url: "http://ws.audioscrobbler.com//2.0/?method="+option+".getInfo&artist="+artist+"&"+option+"="+input+"&autocorrect[0|1]&api_key=5a85a72189c33df2b02663c378c7f775&format=json",
  method: "GET"
}).then(function(response) {
  console.log(response)

  console.log(response.track.wiki.published);
  $('#publication-date').text("Publication Date: " + response.track.wiki.published);
  
  var regex = /^([\d]+)[\s]+([A-Za-z]+)[\s]+([\d]+)/;
  var result = response.track.wiki.published.match(regex);
  var month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(result[2]) / 3 + 1;
  if (month < 10) month = "0"+month;
  var newDate = result[3]+"-"+month+"-"+result[1];
  console.log(newDate);

  var apiKey = 'ee76wy5X0CgOS6B9Tu4yP5HV9YJ35CucnQlOB5Nz';

  var url = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey + "&date=" + newDate + "&hd=False";


  $.ajax({
    url: url,
    success: function(result){
    if("copyright" in result) {
      $("#copyright").text("Image Credits: " + result.copyright);
    }
    else {
      $("#copyright").text("Image Credits: " + "Public Domain");
    }
    
    if(result.media_type == "video") {
      $("#apod_img_id").css("display", "none"); 
      $("#apod_vid_id").attr("src", result.url);
    }
    else {
      $("#apod_vid_id").css("display", "none"); 
      $("#apod_img_id").attr("src", result.url);
    }
  
    $("#apod_explaination").text(result.explanation);
    $("#apod_title").text(result.title);
  }
  });

})
})
>>>>>>> 9b24f9b64b7537719e4ec927712113cc6b76124e
