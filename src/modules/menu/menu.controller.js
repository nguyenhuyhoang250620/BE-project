const service = require("./menu.service");
exports.getMyMenu = async (req, res) => {
  try {
    const role = req.body.role;
    const menu = await service.getUserMenu(role);
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
