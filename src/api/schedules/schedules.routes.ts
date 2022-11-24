import { Router } from "express";
import {
  addSchedule,
  assignMemberToSchedule,
  deleteSchedule,
  getAssignedMemberByScheduleId,
  removeAssignedMember,
  updateSchedule,
} from "./schedules.controller";

const router = Router();
router.route("/").post(addSchedule);
router.route("/:schedule_id").patch(updateSchedule);
router.route("/:schedule_id").delete(deleteSchedule);
router.route("/:schedule_id/members/").get(getAssignedMemberByScheduleId);
router.route("/:schedule_id/members/:member_id").post(assignMemberToSchedule);
router.route("/:schedule_id/members/:member_id").delete(removeAssignedMember);

export default router;
