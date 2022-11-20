import { Router } from "express";
import {
  addMember,
  deleteMemberById,
  getMemberById,
  getMembers,
  updateMemberById,
} from "./members.controller";

const router = Router();
router.route("/").get(getMembers);
router.route("/:member_id").get(getMemberById);
router.route("/").post(addMember);
router.route("/:member_id").patch(updateMemberById);
router.route("/:member_id").delete(deleteMemberById);

export default router;
