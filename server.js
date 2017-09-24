var express =  require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var Article = require("./models/article.js");
var Comment = require("./models/comment.js");

mongoose.Promise = Promise;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var promise = mongoose.connect('mongodb://localhost/mongooseScrape', {
  useMongoClient: true,
});

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
  request("http://www.nationalenquirer.com/", function(error, response, html) {
    var $ = cheerio.load(html);
    $("div.text-block").each(function(i, element) {
        var result = {};

        result.title = $(element).children("h2").text();
        result.summary = $(element).children("a").children("strong").text();
        result.url = $(element).children("a").attr("href");
        
        var entry = new Article(result);

            Article.count({"Summary": entry.summary}, function (err, count){
               if (count > 0){
                   console.log('document exists')
               } else {
               // Now, save that entry to the db
                  entry.save(function(err, doc) {
                  // Log any errors
                     if (err) {
                      console.log(err);
                     }
                      // Or log the doc
                     else {
                       console.log(doc);
                       console.log("here is the data");
                     }
                 });
              }
            });

    });
  });
  res.render("index");
});

app.get("/articles", function(req, res) {
  // Grab every doc in the Articles array
  Article.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});

app.get("/saved", function(req, res) {
  // Grab every doc that's saved in the Articles array
  Article.find({saved: true}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      // 
      console.log(doc);
      res.json(doc);
    }
  });
});

app.post("/saved/:id", function(req, res){
  var savedArticle = new Article(req.body)
  savedArticle.savedTrue();
  savedArticle.save(function(error, doc){
    if (error) {
      res.send(error);
    } else {
      // res.json(doc)
      console.log(doc);
    }
  });
  res.render("saved");
})



app.listen(3000, function() {
  console.log("App running on port 3000!");
});