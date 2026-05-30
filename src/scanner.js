const KEYWORDS = {
  sexual: [
    "mommy",
    "step on me",
    "breed me",
    "smash",
    "would"
  ]
};

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
    category:
      matches.length > 0
        ? matches[0].category.toUpperCase()
        : "SAFE",
    confidence:
      matches.length > 0
        ? 90
        : 100,
    keywords: matches.map(m => m.keyword)
  };
}

module.exports = scanComment;
