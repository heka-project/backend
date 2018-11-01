let fs = require("fs");
let path = require("path");
let dbPath = path.join("db", "users.json");

const userSchema = {
    "users": [
        {
        "id": "",
        "user-nric": "",
        "nrics": [],
    }
],
};
const initialise = () => {
    // checks if db exists
    if (!fs.existsSync(dbPath)) {
        seed(dbPath);
        console.log("file has been created and loaded");
    } else {
        console.log("file already exists no need to create");
    }
};

// Create a new json db
function seed(filePath) {
    fs.writeFile(filePath, JSON.stringify(userSchema), err => {
        console.log(err);
    });
}

module.exports = {
    initialise,
};
