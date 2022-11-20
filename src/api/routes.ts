import { Router } from "express";
import MembersRoutes from "./members/members.routes";

const router = Router();
router.use("/members", MembersRoutes);

export default router;

