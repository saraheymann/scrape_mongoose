$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
        // Display the  information on the page
     $("#articles").append("<nav class='red darken-3 articleNav'><div class='nav-wrapper''data-id=" + data[i]._id + "><a href='" + data[i].url + "' target='_blank' class='articleSummary'>" + data[i].title + "->  " +  data[i].summary + "</a><ul class='right hide-on-med-and-down'><li><a id='saveArticleButton' class='waves-effect waves-light btn''data-id=" + data[i]._id + ">Save Article</a></li></ul></div></nav>");
  }
});

$.getJSON("/saved", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
        // Display the  information on the page
     $("#savedArticles").append("<nav class='red darken-3 articleNav'><div class='nav-wrapper''data-id=" + data[i]._id + "><a href='" + data[i].url + "' target='_blank' class='articleSummary'>" + data[i].title + "->  " +  data[i].summary + "</a><ul class='right hide-on-med-and-down'><li><a id='saveArticleButton' class='waves-effect waves-light btn''data-id=" + data[i]._id + ">Save Article</a></li></ul></div></nav>");
  }
});


$(document).on("click", "#saveArticleButton", function(){
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/saved/" + thisId
  })
  .done(function(data, error){
    console.log(data);
    console.log("this article has been saved")
  }) 
});




