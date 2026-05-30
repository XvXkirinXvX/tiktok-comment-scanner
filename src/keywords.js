const KEYWORDS = require("../keywords.json");

function getKeywords() {
  return KEYWORDS;
}

function getCategoryKeywords(category) {
  return KEYWORDS[category] || [];
}

module.exports = {
  getKeywords,
  getCategoryKeywords
};
