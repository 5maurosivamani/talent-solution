const jsonWebToken = require("jsonwebtoken");
const { jwt } = require("../config/appConfig");
const appConfig = require("../config/appConfig");

const { secret, expiresIn } = appConfig.jwt;

const generateToken = (payload: {}, expiresIn: string) => {
  return jsonWebToken.sign(payload, secret, {
    expiresIn,
  });
};

// Generate Access Token
const generateAccessToken = (user: { userId: string; email: string }) => {
  return generateToken(user, expiresIn.accessToken);
};

// Generate Refresh Token
const generateRefreshToken = (user: { userId: string; email: string }) => {
  return generateToken(user, expiresIn.refreshToken);
};

const verifyToken = (token: string) => {
  try {
    const decoded = jsonWebToken.verify(token, secret);
    return decoded;
  } catch (err: any) {
    console.error("Token verification failed:", err?.message);
    return false;
  }
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
