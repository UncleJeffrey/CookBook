"use strict";

const express = require("express");
const path = require('path');

const recipeRouter = require("./controller/recipe-controller");
const authorRouter = require("./controller/author-controller");
const recipeImageRouter = require("./controller/recipe-image-controller");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/recipe/", recipeRouter);
app.use("/author/", authorRouter);
app.use("/recipeImage/", recipeImageRouter);

app.use("/library-spa.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/library-spa.js'));
})
app.use("/recipe.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/recipe.js'));
})
app.use("/author.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/author.js'));
})
app.use("/author-list.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/author-list.js'));
})
app.use("/author-update-form.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/author-update-form.js'));
})
app.use("/recipe-list.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/recipe-list.js'));
})
app.use("/recipe-update-form.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/recipe-update-form.js'));
})
app.use("/recipe-image-form.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/recipe-image-form.js'));
})
app.use("/calls.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/calls.js'));
})

app.get("/*", function(req,res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(3000, () => {
    console.log("Express server listening on port 3000.")
});
