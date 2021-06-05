const path = require("path");
const CookBookDao = require("../../dao/ingredients-dao");
let dao = new CookBookDao(path.join(__dirname, "..", "..", "storage", "ingredients.json"))

async function UpdateAbl(req, res) {
    let {id, name, unit} = req.body;
    if (
        (id && typeof id === "string" && id.length < 25) &&
        (name && typeof name === "string" && name.length < 30)
        && (unit && typeof unit === "string" && unit.length < 32)
    ) {
        const ingredient = {id, name, unit};
        try {
            let result = await dao.updateIngredient(ingredient);
            res.status(200).json(result);
        } catch (e) {
            if (e.code === "FAILED_TO_GET_INGREDIENT") {
                res.status(400).json({error: e})
            } else if (e.code === "FAILED_TO_UPDATE_INGREDIENT") {
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