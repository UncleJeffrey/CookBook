const path = require("path");
const LibraryDao = require("../../dao/ingredients-dao");
let dao = new LibraryDao(path.join(__dirname, "..", "..", "storage", "ingredients.json"))

async function CreateAbl(req, res) {
    let {id, name, unit} = req.body;
    if (
        name && typeof name === "string" && name.length < 64 &&
        id && typeof id === "string" && id.length < 64 
        && unit && typeof unit === "string" && unit.length < 32
    ) {
        const ingredient = {id, name, unit, approved: false};
        try {
            let result = await dao.addIngredient(ingredient);
            res.status(200).json(result);
        } catch (e) {
            if (e.code === "DUPLICATE_CODE") {
                res.status(400).json({error: e})
            } else if (e.code === "FAILED_TO_STORE_INGREDIENT") {
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