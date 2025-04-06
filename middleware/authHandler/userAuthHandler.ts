import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { CustomError } from "../../utils/CustomError";

// This middleware class validates the fields coming in for registration and login
// It makes sure they are non empty along with correct format for email

class ValidationMiddleWare {
  /**
   * Middleware for validating user registration input fields.
   *
   * Validates that:
   * - `username` is not empty after trimming.
   * - `email` is not empty, trimmed, and in valid format.
   * - `password` is not empty after trimming.
   *
   * If validation fails, throws a CustomError with details.
   *
   * @returns {Array} An array of middleware functions to use in an Express route.
   */
  static validateRegisterInput() {
    return [
      body("username").trim().notEmpty().withMessage("Username is required"),
      body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage(
          "Email needs to be in valid format e.g 'john.doe@example.com' "
        ),
      body("password").trim().notEmpty().withMessage("Password is required"),

      (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const error = new CustomError(
            "Error with the input received",
            400,
            errors.array()
          );
          return next(error);
        }
        next();
      },
    ];
  }

  /**
   * Middleware for validating user registration input fields.
   *
   * Validates that:
   * - `username` is not empty after trimming.
   * - `password` is not empty after trimming.
   *
   * If validation fails, throws a CustomError with details.
   *
   * @returns {Array} An array of middleware functions to use in an Express route.
   */
  static validLoginInput() {
    return [
      body("username").trim().notEmpty().withMessage("Username is required"),
      body("password").trim().notEmpty().withMessage("Password is required"),

      (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const error = new CustomError(
            "Validation Error",
            400,
            errors.array()
          );
          return next(error);
        }
        next();
      },
    ];
  }
}

export { ValidationMiddleWare };
