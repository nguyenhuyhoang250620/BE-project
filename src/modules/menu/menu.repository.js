const db = require("../../database");

exports.getMenuByRole = (role) =>
  new Promise((resolve, reject) => {
    db.all(
      `
                SELECT m.*
                FROM menus m
                JOIN role_menu rm ON m.id = rm.menu_id
                WHERE rm.role = ? AND m.is_active =  1
                ORDER BY m.sort_order
            `,
      [role],
      (err, rows) => (err ? reject(err) : resolve(rows)),
    );
  });
