const db = require("../../database");

exports.findEmail = (email) =>
  new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) =>
      err ? reject(err) : resolve(row),
    );
  });

exports.findById = (id) =>
  new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) =>
      err ? reject(err) : resolve(row),
    );
  });

exports.createUser = (email, password) =>
  new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (email,password) VALUES (?,?)",
      [email, password],
      function (err) {
        err ? reject(err) : resolve(this.lastID);
      },
    );
  });

exports.saveRefreshToken = (userId, token) =>
  new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO refresh_tokens (user_id, token) VALUES (?,?)",
      [userId, token],
      function (err) {
        err ? reject(err) : resolve();
      },
    );
  });

exports.findRefreshToken = (token) =>
  new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM refresh_tokens WHERE token = ?",
      [token],
      (err, row) => (err ? reject(err) : resolve(row)),
    );
  });

exports.deleteRefreshToken = (token) =>
  new Promise((resolve, reject) => {
    db.run("DELETE FROM refresh_tokens WHERE token = ?", [token], (err) =>
      err ? reject(err) : resolve(),
    );
  });
