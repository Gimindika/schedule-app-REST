import { Router } from "express";
import { getMembers } from "./members.controller";

const router = Router();
router.route("/").get(getMembers);

export default router;
