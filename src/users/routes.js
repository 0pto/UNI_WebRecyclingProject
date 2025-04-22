import express from "express";


// Import controller and middlewares
import { registerAUser, updateUser, loginUser, getUserByid, getBookingsAndSalesTotals } from "./controllers.js";
import { hashPassword, checkPass, checkOldPassword } from "../middleware/authValidations.js";
import { isPasswordValid, isEmailValid } from "../middleware/userValidations.js";

const usersRouter = express.Router();

usersRouter.post("/register", isEmailValid, isPasswordValid, hashPassword, registerAUser);

usersRouter.post("/login", checkPass, loginUser);

usersRouter.put("/updateDetails", isPasswordValid, checkOldPassword, updateUser);

usersRouter.get("/statistics", getBookingsAndSalesTotals);

usersRouter.get("/getUser/:id", getUserByid); // Add route to fetch user by ID

export default usersRouter;
