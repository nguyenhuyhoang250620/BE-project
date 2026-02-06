const service = require("./auth.service");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await service.register(email, password);
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const tokens = await service.login(email, password);
    res.json(tokens);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const token = await service.refresh(refreshToken);
    res.json(token);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    await service.logout(refreshToken);
    res.json({ succes: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
