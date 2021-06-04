const path = require("path");
const LibraryDao = require("../../dao/recipe-dao");
let dao = new LibraryDao(path.join(__dirname, "..", "..", "storage", "recipes.json"))
<<<<<<< Updated upstream:abl/recipe/create-abl.js
const AuthorsDao = require("../../dao/authors-dao");
let authorsDao = new AuthorsDao(path.join(__dirname, "..", "..", "storage", "authors.json"))

async function CreateAbl(req, res) {
    let {id, name, authorList} = req.body;
    if (
        name && typeof name === "string" && name.length < 200 &&
        authorList && authorList.length > 0 && authorList.length < 10 &&
        id && typeof id === "string" && id.length < 25
    ) {
        for (let i = 0; i< authorList.length; i++) {
            try {
                await authorsDao.getAuthor(authorList[i])
            } catch (e) {
                if (e.code === "FAILED_TO_GET_AUTHOR") {
=======
const IngredientsDao = require("../../dao/ingredients-dao");
let ingredientsDao = new IngredientsDao(path.join(__dirname, "..", "..", "storage", "ingredients.json"))

async function CreateAbl(req, res) {
    let {id, name, ingredientList} = req.body;
    if (
        name && typeof name === "string" && name.length < 200 &&
        ingredientList && ingredientList.length > 0 && ingredientList.length < 10 &&
        id && typeof id === "string" && id.length < 25
    ) {
        for (let i = 0; i< ingredientList.length; i++) {
            try {
                await ingredientsDao.getIngredient(ingredientList[i])
            } catch (e) {
                if (e.code === "FAILED_TO_GET_INGREDIENT") {
>>>>>>> Stashed changes:abl/book/create-abl.js
                    res.status(400).json({error: e})
                } else {
                    res.status(500).json({error: e})
                }
            }
        }
<<<<<<< Updated upstream:abl/recipe/create-abl.js
        const recipe = {id, name, authorList};
=======
        const recipe = {id, name, ingredientList};
>>>>>>> Stashed changes:abl/book/create-abl.js
        try {
            let result = await dao.addRecipe(recipe);
            res.status(200).json(result);
        } catch (e) {
            if (e.code === "DUPLICATE_CODE") {
                res.status(400).json({error: e})
            } else if (e.code === "FAILED_TO_STORE_RECIPE") {
                res.status(500).json({error: e})
            } else {
                res.status(500).json({error: e})
            }
        }
    } else {
        res.status(400).json({
            "error": "Invalid dtoIn"
        })
    }
}

module.exports = CreateAbl;