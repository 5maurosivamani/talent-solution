import { Request } from 'express';

type UserType = { // Define the user property
    _id: string; // Example: add user _id or any other field you want
    username: string;
    email: string;
  }

// Extend the Request interface
declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}