var mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
var Schema = mongoose.Schema;

mongoose.plugin(slug);

const Article = mongoose.model('Article', {
    title: String,
    slug: { type: String, slug: "title" },
    content: String
});

mongoose.plugin(slug);

let createArticle = function createArticle(title, content) {
    var newArticle = new Article({ title: title, content: content  });
    newArticle.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('article created');
        }
    })
};

let deleteArticle = function deleteArticle(article) {};

const database = {
    mongoose: mongoose,
    createArticle: createArticle,
    deleteArticle: deleteArticle,
    article: Article
};

module.exports = database;
