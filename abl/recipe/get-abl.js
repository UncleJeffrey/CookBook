const path = require("path");
const LibraryDao = require("../../dao/recipe-dao");
let dao = new LibraryDao(path.join(__dirname, "..", "..", "storage", "recipes.json"))
const IngredientsDao = require("../../dao/ingredients-dao");
let ingredientsDao = new IngredientsDao(path.join(__dirname, "..", "..", "storage", "ingredients.json"))

async function GetAbl(req, res) {
    let {id} = req.query;
    if (
        id && typeof id === "string" && id.length < 25
    ) {
        try {
            let result = await dao.getRecipe(id);
            result.ingredientObjectList = [];
            for (let i = 0; i < result.ingredientList.length; i++) {
                try {
                    let ingredient = await ingredientsDao.getIngredient(result.ingredientList[i])
                    result.ingredientObjectList.push(ingredient);
                } catch (e) {
                    if (e.code === "FAILED_TO_GET_INGREDIENT") {
                        res.status(400).json({error: e})
                    } else {
                        res.status(500).json({error: e})
                    }
                }
            }
            res.status(200).json(result);
        } catch (e) {
            if (e.code === "FAILED_TO_GET_RECIPE") {
                res.status(400).json({error: e})
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

module.exports = GetAbl;