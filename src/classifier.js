const { getKeywords } = require("./keywords");

function classify(comment) {
  const text = comment.toLowerCase();

  const keywords = getKeywords();

  let matches = [];

  for (const category in keywords) {
    for (const keyword of keywords[category]) {
      if (text.includes(keyword.toLowerCase())) {
        matches.push({
          category,
          keyword
        });
      }
    }
  }

  if (matches.length === 0) {
    return {
      category: "SAFE",
      confidence: 100,
      keywords: []
    };
  }

  const counts = {};

  matches.forEach(match => {
    counts[match.category] =
      (counts[match.category] || 0) + 1;
  });

  const category =
    Object.entries(counts)
      .sort((a, b) => b[1] - a[1])[0][0];

  return {
    category: category.toUpperCase(),
    confidence: Math.min(
      70 + matches.length * 10,
      99
    ),
    keywords: matches.map(m => m.keyword)
  };
}

module.exports = classify;
