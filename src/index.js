const classify = require("./classifier");
const { saveScan } = require("./database");

const args = process.argv.slice(2);

const comment = args.slice(1).join(" ");

const result = classify(comment);

result.comment = comment;

console.log(result);

saveScan(result)
  .then(() => console.log("Saved"))
  .catch(console.error);
