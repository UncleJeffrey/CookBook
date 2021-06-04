const path = require("path");
const LibraryDao = require("../../dao/recipe-dao");
let dao = new LibraryDao(path.join(__dirname, "..", "..", "storage", "recipes.json"))

async function UpdateAbl(req, res) {
<<<<<<< Updated upstream:abl/recipe/update-abl.js
    let {id, name, authorList} = req.body;
    if (
        (id && typeof id === "string" && id.length < 25) &&
        (name && typeof name === "string" && name.length < 200) &&
        (authorList && authorList.length > 0 && authorList.length < 10)
    ) {
        const recipe = {id, name, authorList};
=======
    let {id, name, ingredientList} = req.body;
    if (
        (id && typeof id === "string" && id.length < 25) &&
        (name && typeof name === "string" && name.length < 200) &&
        (ingredientList && ingredientList.length > 0 && ingredientList.length < 10)
    ) {
        const recipe = {id, name, ingredientList};
>>>>>>> Stashed changes:abl/book/update-abl.js
        try {
            let result = await dao.updateRecipe(recipe);
            res.status(200).json(result);
        } catch (e) {
            if (e.code === "FAILED_TO_GET_RECIPE") {
                res.status(400).json({error: e})
            } else if (e.code === "FAILED_TO_UPDATE_RECIPE") {
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

module.exports = UpdateAbl;