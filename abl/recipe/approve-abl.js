const path = require("path");
const CookBookDao = require("../../dao/recipe-dao");
let dao = new CookBookDao(path.join(__dirname, "..", "..", "storage", "recipes.json"))

async function UpdateAbl(req, res) {
    let {id} = req.body;
    if (
        (id && typeof id === "string" && id.length < 25)
    ) {
        const recipe = {id, approved: true};
        try {
            let result = await dao.approveRecipe(recipe);
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