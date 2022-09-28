// read a file from fs
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "a.json");
const file = fs.readFileSync(filePath, "utf8");

let j = JSON.parse(file);
let goodData = j.data.map((iter) => iter.slice(0, -1));

// write json to a file in fs
fs.writeFile(
  "records2.json",
  JSON.stringify(goodData, null, 2),
  function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  }
);
