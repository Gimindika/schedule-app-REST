import { Router } from "express";
import MembersRoutes from "./members.routes";

const router = Router();
router.use("/members", MembersRoutes);

export default router;
