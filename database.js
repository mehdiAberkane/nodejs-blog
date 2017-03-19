const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

let getAll = function getAll(){

    let articles = [
        {"title": "mon titre", "slug": "mon-titre", "content": "mon article"},
        {"title": "mon titre 2", "slug": "mon-titsdsdsdre", "content": "les chats roux"},
        {"title": "mon titre 3", "slug": "mon-titsdsdre", "content": "vive les chiens"},
        {"title": "mon titre 4", "slug": "mon-titsdsddre", "content": "mon qsdqsdqsqdd"},
        {"title": "mon titre 5", "slug": "mon-titrddsdsde", "content": "mon artqsdqsdicle"},
        {"title": "mon titre 6", "slug": "mon-titsdssssre", "content": "mon qsdqsd"}
    ];
    return articles;
};

let getOneBySlug = function getOneBySlug(slug) {

};

let createArticle = function createArticle(title, content) {
    var Article = mongoose.model('Article', {
        title: String, slug: { type: String, slug: "title" }, content: String
    });

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
    deleteArticle: deleteArticle
};

module.exports = database;


