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

    
    
    var img = "<a href='"+ childSnapshot.val().hdurl +"' target='blank'><img class='uk-margin' src="+childSnapshot.val().url+" width=300px height=300px><div>"+childSnapshot.val().title+"</div></a>"
    $("#results").append(img)

  }); // end database.ref().on("child_added", function (childSnapshot, prevChildKey) {}
});// end $(document).ready(function () {