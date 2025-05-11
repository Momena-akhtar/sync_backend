import express, { Router } from "express";

import {
  userLogout,
  getUserProfile,
  searchUser,
} from "../../controllers/authControllers/commonAuthControllers";
import { ValidationMiddleWare } from "../../middleware/authHandler";
const router: Router = express.Router();

/**
 * @swagger
 * /api/userLogout:
 *   get:
 *     summary: Logout user by clearing the authentication token cookie
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully logged out
 *       500:
 *         description: Internal server error
 */
router
  .route("/userLogout")
  .get( userLogout);

/**
 * @swagger
 * /api/userProfile:
 *   get:
 *     summary: Get user profile information for both Firebase and Custom User
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: Only for local authentication (if available)
 *                 email:
 *                   type: string
 *                   description: User email address
 *                 authProvider:
 *                   type: string
 *                   description: Provider of authentication (e.g., "local")
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Account creation timestamp
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Last profile update timestamp
 *       404:
 *         description: User not found (if the token does not correspond to a valid user)
 *       500:
 *         description: Internal server error
 */
router
  .route("/userProfile")
   .get(ValidationMiddleWare.validateToken(), getUserProfile);

/**
 * @swagger
 * /api/user/search:
 *   get:
 *     summary: Search for users using partial username or email
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: false
 *         description: Partial or full username to search for
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: false
 *         description: Partial or full email address to search for
 *     responses:
 *       200:
 *         description: List of matching users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Missing or invalid query parameters (username or email required)
 *       404:
 *         description: No matching users found
 *       500:
 *         description: Internal server error
 */

router
  .route("/user/search/")
  .get(
    ValidationMiddleWare.validateToken(),
    ValidationMiddleWare.checkEmailOrUsernameInQueryParam(),
    searchUser
  );
export default router;
