var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  summary: {
    type: String,
    // required: true,
    unique: true
  },
  url:{
    type: String,
    // required: true,
    unique: true
  },
  saved:{
    type: Boolean,
    default: false
  },
  Comment:{
    type: Schema.Types.ObjectId,
    ref: "Comment"
    }
});

ArticleSchema.methods.savedTrue = function(){
  this.saved = true;
  return this.saved;
};

var Article = mongoose.model("Article", ArticleSchema);

// Export the model so we can use it on our server file.
module.exports = Article;