import express from "express";
import User from "../models/users.js";

// Import controller and middlewares
import {
  registerAUser,
  updateUser,
  deleteUser,
  loginUser,
  getBookingsAndSalesTotals,
} from "./controllers.js";
import {
  hashPassword,
  checkPass,
  verifyToken,
} from "../middleware/authValidations.js";
import {
  isPasswordValid,
  isEmailValid,
} from "../middleware/userValidations.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  isEmailValid,
  isPasswordValid,
  hashPassword,
  registerAUser
);
usersRouter.post("/login", checkPass, loginUser);
usersRouter.put(
  "/updateDetails",
  // checkToken,
  // isPasswordValid,
  // hashPass,
  // isEmailValid,
  updateUser
);

usersRouter.get("/statistics", getBookingsAndSalesTotals);

// Add route to fetch user by ID
usersRouter.get("/getUser/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default usersRouter;
