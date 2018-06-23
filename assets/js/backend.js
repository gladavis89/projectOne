    var publishedDate = "Sun, 27 Jul 2008 15:44:58 +0000";
    var regex = /^[a-zA-Z]+\,[\s]+([\d]+)[\s]+([A-Za-z]+)[\s]+([\d]+)/;
    var result = publishedDate.match(regex);
    var month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(result[2]) / 3 + 1;
    if (month < 10) month = "0"+month;
    var newDate = result[3]+"-"+month+"-"+result[1];
    console.log(newDate);
    
    // Use your own token (this is just an example)
    var apiKey = 'ee76wy5X0CgOS6B9Tu4yP5HV9YJ35CucnQlOB5Nz';
    var date = '2001-05-04'

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
      $("#reqObject").text(url);
      $("#returnObject").text(JSON.stringify(result, null, 4));  
      $("#apod_explaination").text(result.explanation);
      $("#apod_title").text(result.title);
    }
    });
    