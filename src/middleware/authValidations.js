import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

//Hash the password before saving in database
export const hashPassword = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 6);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: error.message });
  }
};

//Validate user's login request
export const checkPass = async (req, res, next) => {
  if (req.body.password !== "" && req.body.username !== "") {
    try {
      req.matchingUser = await User.findOne({
        where: { username: req.body.username },
      });
      //check if submitted password matches password in database
      const isPasswordCorrect = bcrypt.compare(
        req.body.password,
        req.matchingUser.password
      );
      if (req.matchingUser && isPasswordCorrect) {
        console.log("looking for...", req.body.username);
        console.log("User found:", req.matchingUser);
        next();
      } else {
        throw new Error("incorrect username or password");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, error: error.message });
    }
  } else {
    throw new Error("Empty field.");
  }
};

//fix this to authenticate the stats end point.
export const verifyToken = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      console.log("no token passed");
      throw new Error("no token passed");
    }
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedJwt.username_);
    if (req.user) {
      req.authUser = req.user;
      next();
    } else {
      throw new Error("user is not authorised");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: error.message });
  }
};
