var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

  headline: {
    type: String
  },
  summary: {
    type: String,
    required: true
  },
  url:{
    type: String,
    required: true
  },
  Comment:{
    type: Schema.Types.ObjectId,
    ref: "Comment"
    }
});

var Article = mongoose.model("Article", ArticleSchema);

// Export the model so we can use it on our server file.
module.exports = Article;