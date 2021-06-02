const path = require("path");
const LibraryDao = require("../../dao/book-dao");
let dao = new LibraryDao(path.join(__dirname, "..", "..", "storage", "books.json"))
const AuthorsDao = require("../../dao/authors-dao");
let authorsDao = new AuthorsDao(path.join(__dirname, "..", "..", "storage", "authors.json"))

async function GetAbl(req, res) {
    let {id} = req.query;
    if (
        id && typeof id === "string" && id.length < 25
    ) {
        try {
            let result = await dao.getBook(id);
            result.authorObjectList = [];
            for (let i = 0; i < result.authorList.length; i++) {
                try {
                    let author = await authorsDao.getAuthor(result.authorList[i])
                    result.authorObjectList.push(author);
                } catch (e) {
                    if (e.code === "FAILED_TO_GET_AUTHOR") {
                        res.status(400).json({error: e})
                    } else {
                        res.status(500).json({error: e})
                    }
                }
            }
            res.status(200).json(result);
        } catch (e) {
            if (e.code === "FAILED_TO_GET_BOOK") {
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