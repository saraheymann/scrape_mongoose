$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
        // Display the  information on the page
     $("#articles").append("<nav class='red darken-3 articleNav'><div class='nav-wrapper''data-id=" + data[i]._id + "><a href='" + data[i].url + "' target='_blank' class='articleSummary'>" + data[i].title + "->  " +  data[i].summary + "</a><ul class='right hide-on-med-and-down'><li><a id='saveArticleButton' class='waves-effect waves-light btn'>Save Article</a></li></ul></div></nav>");
  }
});
//  "<nav><div class='nav-wrapper''data-id=" + data[i]._id + "><a href='https://www.democracynow.org'" + data[i].url + "target='_blank' class='brand-logo'>"+ data[i].summary + "</a><ul class='right hide-on-med-and-down'><li><a id='saveArticleButton' class='waves-effect waves-light btn'>Save Article</a></li></ul></div></nav>"

$(document).on("click", "#saveArticleButton", function(){
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/saved/" + thisId
  })
  .done(function(data, error){
    // for (var i = 0; i < data.length; i++) {
    //   var element = data[i];
    // }
    console.log(data);
    console.log("this article has been saved")
  }) 
});


$(document).on("click", "p", function() {
  var thisId = $(this).attr("data-id");
  //   ajax request to save article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .done(function(data, error) {
      // if (error){
      //   console.log("you're not catching data");
      // }else{
          console.log(data);
          // $("#articles").append("<h2 id='saveSummary'>" + data.summary + "<h2>")
          // $("#articles").append("<h3 id='saveUrl'>" + data.url + "<h3>")
          $("#comments").append("<h2>" + data.title + "</h2>");
          // An input to enter a new title
           $("#comments").append("<input id='titleinput' name='title' >");
          // A textarea to add a new note body
          $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
          // A button to submit a new note, with the id of the article saved to it
          $("#comments").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      // }
          if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.comment.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.comment.body);
      }
    })  
});

$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
  .done(function(data) {
      // Log the response
    console.log(data);
  });
});
      


