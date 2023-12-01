import express from "express";
import {
  changePassword,
  getMyProfile,
  logOut,
  signup,
  updateProfile,
  updatePic,
  login,
  forgetpassword,
  resetpassword,
} from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();
router.post("/login", login);
router.post("/signup", singleUpload, signup);
router.get("/profile", isAuthenticated, getMyProfile);
router.get("/logout", isAuthenticated, logOut);
router.put("/updateProfile", isAuthenticated, updateProfile);
router.put("/changePassword", isAuthenticated, changePassword);
router.put("/updatePic", isAuthenticated, singleUpload, updatePic);

router.route("/forgetpassword").post(forgetpassword).put(resetpassword);

export default router;
