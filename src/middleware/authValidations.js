import bcrypt from "bcrypt";
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

//Validate old password for updating user's details
export const checkOldPassword = async (req, res, next) => {
  if (req.body.old_password !== "" && req.body.username !== "") {
    try {
      req.matchingUser = await User.findOne({ where: { username: req.body.username } });
      //check if submitted password matches password in database
      const isPasswordCorrect = bcrypt.compare(req.body.password, req.matchingUser.password);
      if (req.matchingUser && isPasswordCorrect) {
        console.log("looking for...", req.body.username)
        console.log("User found:", req.matchingUser)
        next();
      } else {
        throw new Error("incorrect old password");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, error: error.message });
    }
  } else {
    throw new Error("Empty field.");
  }
};

// //Validate user's login request
// export const checkPass = async (req, res, next) => {
//   if (req.body.password !== "" && req.body.username !== "") {
//     try {
//       req.matchingUser = await User.findOne({ where: { username: req.body.username } });
//       //check if submitted password matches password in database
//       const isPasswordCorrect = bcrypt.compare(req.body.password, req.matchingUser.password);
//       console.log("isPasswordCorrect", isPasswordCorrect);

//       if (req.matchingUser && isPasswordCorrect === true) {
//         console.log("looking for...", req.body.username)
//         console.log("User found:", req.matchingUser)
//         next();
//       } else {
//         res.status(401).send({ success: false, message: "incorrect username or password" });
//         throw new Error("incorrect username or password");
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({ success: false, error: error.message });
//     }
//   } else {
//     throw new Error("Empty field.");
//   }
// };

export const checkPass = async (req, res, next) => {
  if (!req.body.password || !req.body.username) {
    return res.status(400).send({ success: false, error: "Username and password are required." });
  }

  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) {
      return res.status(401).send({ success: false, error: "Incorrect username or password." });
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).send({ success: false, error: "Incorrect username or password." });
    }

    req.matchingUser = user;
    console.log("User found:", req.matchingUser.username);
    next();
  } catch (error) {
    console.error("Error in checkPass:", error);
    res.status(500).send({ success: false, error: "Internal server error." });
  }
};