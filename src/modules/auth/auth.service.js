const repo = require("./auth.repository");
const { comparePassword, hashPassword } = require("../../utils/hash");
const {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
} = require("../../utils/jwt");

exports.register = async (email, password) => {
  const exists = await repo.findEmail(email);
  if (exists) throw new Error("Email already exists");
  const hashed = await hashPassword(password);
  const userId = await repo.createUser(email, hashed);
  return { userId };
};

exports.login = async (email, password) => {
  const user = await repo.findEmail(email);
  if (!user) throw new Error("Invalid credentials");
  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Invalid credentials");
  const payload = { id: user.id, role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  await repo.saveRefreshToken(user.id, refreshToken);
  return {
    accessToken,
    refreshToken,
  };
};

exports.refresh = async (refreshToken) => {
  if (!refreshToken) throw new Error("Missing refresh token");
  const stored = await repo.findRefreshToken(refreshToken);
  if (!stored) throw new Error("Invalid refresh token");

  const payload = verifyAccessToken(refreshToken);

  const user = await repo.findById(payload.id);
  if (!user) throw new Error("User noy found");

  const newAccessToken = signAccessToken({
    id: user.id,
    role: user.role,
  });

  return { accessToken: newAccessToken };
};

exports.logout = async (refreshToken) => {
  if (!refreshToken) throw new Error('Missing refresh token');

  await repo.deleteRefreshToken(refreshToken);
};