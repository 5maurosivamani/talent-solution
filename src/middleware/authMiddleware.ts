import { NextFunction, Request, Response } from "express";
const { verifyToken } = require("../utils/jwtHelper");

const authenticate = (
  req: Request & { user: {} },
  res: Response,
  next: NextFunction
) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access token is missing or invalid." });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }

  // Attach user info to the request object
  req.user = decoded;
  next();
};

module.exports = { authenticate };
