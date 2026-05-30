const KEYWORDS = require("../keywords.json");

function scanComment(comment) {
  const text = comment.toLowerCase();

  const matches = [];

  for (const category in KEYWORDS) {
    for (const keyword of KEYWORDS[category]) {
      if (text.includes(keyword.toLowerCase())) {
        matches.push({
          category,
          keyword
        });
      }
    }
  }

  return {
    comment,
    category: matches.length
      ? matches[0].category.toUpperCase()
      : "SAFE",
    keywords: matches.map(m => m.keyword)
  };
}

module.exports = scanComment;
