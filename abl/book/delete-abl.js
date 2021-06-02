const path = require("path");
const LibraryDao = require("../../dao/book-dao");
let dao = new LibraryDao(path.join(__dirname, "..", "..", "storage", "books.json"))

async function DeleteAbl(req, res) {
    let {id} = req.body;
    if (
        id && typeof id === "string" && id.length < 25
    ) {
        try {
            await dao.deleteBook(id);
            res.status(200).json({});
        } catch (e) {
            if (e.code === "FAILED_TO_DELETE_BOOK") {
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

module.exports = DeleteAbl;