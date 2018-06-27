$(document).ready(function () {
    console.log("fav.js ready!");
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

  db.ref().on("child_added", function (childSnapshot, prevChildKey) {
    //console.log("childSnapshot", childSnapshot);   
       
    console.log("childSnapshot.val()", childSnapshot.val());

    $('#results').empty();
    
    var img = "<div>"+childSnapshot.val().title+"<img src="+childSnapshot.val().url+"></div>"
    $("#results").prepend(img)

    // var id = 0;
    // childSnapshot.forEach(element => {
    //     var figure = $("<figure>");
    //     figure.addClass("images");
    //     figure.attr("id", id);
    //     $('#results').append(figure);
    //     console.log("element.copyright:",element.copyright);
    //     console.log("element:", element)
    //     console.log("element.val():", element.val())
    //     console.log("---------------------------------------------------------------------------");
    //     var figcaption = $("<figcaption>").text("Copyright: " + element.copyright);
    //     var imageUrl = element.url;
    //     var image = $("<img>");
    //     image.addClass("gif");
    //     image.attr("src", imageUrl);
    //     image.attr("alt", element.media_type);
    //     $('#'+id).append(figcaption);
    //     $('#'+id++).append(image);
    // });// end childSnapshot.val().forEach(element => {

  }); // end database.ref().on("child_added", function (childSnapshot, prevChildKey) {}
});// end $(document).ready(function () {