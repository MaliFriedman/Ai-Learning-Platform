import { Router } from "express";
import { register, login, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller";
import { validateRegister, validateLogin , validateId} from "../middlewares/validateUser.middleware";
import { isAdmin } from "../middlewares/admin.middleware";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

router.get("/", authenticateToken, isAdmin, getAllUsers);
router.get("/:id", authenticateToken, isAdmin, validateId, getUserById);
router.put("/:id", authenticateToken, isAdmin, validateId, updateUser);
router.delete("/:id", authenticateToken, isAdmin, validateId, deleteUser);

export default router;
