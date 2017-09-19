var express =  require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");
var exphbs = require("express-handlebars");

mongoose.Promise = Promise;

var app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

mongoose.connect("mongodb://localhost");
var db = mongoose.connection

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});
// routes
app.get("/", function(req,res){
        res.render("index");
});
      
app.get("/scrape", function(req, res) {
  
  request("https://www.democracynow.org/", function(error, response, html) {
    
    var $ = cheerio.load(html);
    
    $("div.news-label").each(function(i, element) {

      
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");

 
      var entry = new Article(result);

      // Now, save that entry to the db
      entry.save(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        // Or log the doc
        else {
          console.log(doc);
        }
      });

    });
  });
  
  res.send("Scrape Complete");
});

app.listen(3000, function() {
  console.log("App running on port 3000!");
});