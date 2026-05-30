const scanComment = require("./scanner");

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
Usage:

Scan a comment:
node src/index.js scan "your comment"

Examples:
node src/index.js scan "step on me mommy 😩"
node src/index.js scan "nice edit bro"
  `);

  process.exit(0);
}

const command = args[0];

switch (command) {
  case "scan": {
    const comment = args.slice(1).join(" ");

    if (!comment) {
      console.error("Please provide a comment.");
      process.exit(1);
    }

    const result = scanComment(comment);

    console.log(JSON.stringify(result, null, 2));
    break;
  }

  default:
    console.error(`Unknown command: ${command}`);
    process.exit(1);
}
