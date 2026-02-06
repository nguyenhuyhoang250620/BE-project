const repo = require("./menu.repository");

exports.getUserMenu = async (role) => {
  const menus = await repo.getMenuByRole(role);
  const map = {};
  menus.forEach((element) => {
    return (map[element.id] = { ...element, children: [] });
  });
  const tree = [];
  menus.forEach((m) => {
    if (m.parent_id) {
      map[m.parent_id]?.children.push(map[m.id]);
    } else {
      tree.push(map[m.id]);
    }
  });
  return tree;
};
