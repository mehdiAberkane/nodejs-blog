const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Article = mongoose.model('Article', {
    title: String,
    slug: { type: String, slug: "title" },
    content: String
});

mongoose.plugin(slug);

let getAll = function getAll(){

    Article.find({slug: slug}, function (err, articles) {
        if (err) { throw err; }

        return articles;
    });

    return articles;
};

let getOneBySlug = function getOneBySlug(slug) {

    Article.find({slug: slug}, function (err, article) {
        if (err) { throw err; }
        return article;
    });
};

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

let deleteArticle = function deleteArticle(article) {

};

const database = {
    mongoose: mongoose,
    getAll: getAll,
    getOneBySlug: getOneBySlug,
    createArticle: createArticle,
    deleteArticle: deleteArticle,
    article: Article
};

module.exports = database;


