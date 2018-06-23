$("#submit").click(function(){

console.log($("#drop").val())
console.log($("#input").val())
var input = $('#input').val()
var option = $("#drop").val()
var artist = 'artist.getInfo&artist='
var album = 'album.getInfo&album='
var song = 'track.getInfo&track='



$.ajax({
  url: "http://ws.audioscrobbler.com//2.0/?method="+option+".getInfo&"+option+"="+input+"&api_key=5a85a72189c33df2b02663c378c7f775&format=json",
  method: "GET"
}).then(function(response) {
  console.log(response)



})
})