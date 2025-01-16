import { login, register, getAllUsers, logout } from "../controllers/userController.js"; 
import express from "express";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.get("/logout/:id", logout);

export default router;
