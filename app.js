"use strict";

const express = require("express");
const path = require('path');

const bookRouter = require("./controller/book-controller");
const recipeRouter = require("./controller/book-controller");
const ingredientRouter = require("./controller/ingredient-controller");
const bookImageRouter = require("./controller/book-image-controller");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/book/", bookRouter);
app.use("/ingredient/", ingredientRouter);
app.use("/bookImage/", bookImageRouter);

app.use("/library-spa.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/library-spa.js'));
})
app.use("/book.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/book.js'));
})
app.use("/ingredient.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/ingredient.js'));
})
app.use("/ingredient-list.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/ingredient-list.js'));
})
app.use("/ingredient-update-form.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/ingredient-update-form.js'));
})
app.use("/book-list.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/book-list.js'));
})
app.use("/book-update-form.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/book-update-form.js'));
})
app.use("/book-image-form.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/book-image-form.js'));
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
