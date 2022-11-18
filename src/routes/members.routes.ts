import { Router } from "express";
import { getMembers } from "../controllers/members.controller";

const router = Router();
router.route("/").get(getMembers);

export default router;
