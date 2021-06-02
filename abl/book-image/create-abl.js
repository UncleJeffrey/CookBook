const fs = require("fs");
const path = require("path");
const Ajv = require("ajv").default;
const LibraryDao = require("../../dao/book-dao");
let dao = new LibraryDao(path.join(__dirname, "..", "..", "storage", "books.json"))
const { createBookImageSchema } = require("../../schemas/book-image-schemas");

async function CreateAbl(busboy, res) {
    let dtoIn = {};
    // the text part of the multipart used to compose the input of the route for validation
    busboy.on("field", function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        dtoIn[fieldname] = val;
    });

    // for simplicity assume that the file is listed last in the multipart
    busboy.on("file", async (fieldname, file, filename, encoding, mimetype) => {
        // validace vstupu
        const ajv = new Ajv();
        const valid = ajv.validate(createBookImageSchema, dtoIn);

        // nevalidní vstup
        if (!valid) {
            return res.status(400).json({error: ajv.errors});
        }

        // verifying that the book exists
        const book = await dao.getBook(dtoIn.code);
        if (!book) {
            return res.status(400).json({error: `Book with code '${dtoIn.code}' doesn't exist.`});
        }

        // Restrict the image format to .png - prevent other formats from loading
        if (mimetype !== "image/png") {
            return res.status(400).json({error: `Only supported mimetype is image/png`});
        }

        // we save the file under the book code to allow subsequent retrieval
        let saveTo = path.join(__dirname, "..", "..", "storage", dtoIn.code + ".png");
        let writeStream = fs.createWriteStream(saveTo);
        file.pipe(writeStream);
    });

    // image uploaded successfully
    busboy.on("finish", function() {
        res.json({ status: "File succesfully uploaded!" });
    });

    // an error occurred during the upload
    busboy.on("error", err => {
        res.json({error: err})
    });
}

module.exports = CreateAbl;