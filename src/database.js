const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./comments.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS scans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      comment TEXT,
      category TEXT,
      confidence INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

function saveScan(result) {
  return new Promise((resolve, reject) => {
    db.run(
      `
      INSERT INTO scans
      (comment, category, confidence)
      VALUES (?, ?, ?)
      `,
      [
        result.comment,
        result.category,
        result.confidence
      ],
      function(err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}

function getRecentScans(limit = 10) {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT *
      FROM scans
      ORDER BY id DESC
      LIMIT ?
      `,
      [limit],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}

module.exports = {
  saveScan,
  getRecentScans
};
