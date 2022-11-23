import { Router } from "express";
import {
  getAssignedMemberByScheduleId,
  getSchedulesByBatchId,
} from "./schedules.controller";

const router = Router();
router.route("/:batch_id").get(getSchedulesByBatchId);
router
  .route("/:batch_id/members/:schedule_id")
  .get(getAssignedMemberByScheduleId);

export default router;
