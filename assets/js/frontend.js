$("#submit").click(function(){

console.log($("#drop").val())

var artist = 'artist.search&artist=nirvana'
var album = 'album.search&album='
var option = 'track.search&track=feel good inc'



$.ajax({
  url: "http://ws.audioscrobbler.com//2.0/?method=track.search&track=feel good inc&api_key=5a85a72189c33df2b02663c378c7f775&format=json",
  method: "GET"
}).then(function(response) {
  console.log(response)



})
})