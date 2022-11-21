import { Router } from "express";
import {
  getBatches,
  getSchedulesByBatchId,
  getAssignedMemberByScheduleId,
} from "./schedules.controller";

const router = Router();
router.route("/").get(getBatches);
router.route("/:batch_id").get(getSchedulesByBatchId);
router
  .route("/:batch_id/members/:schedule_id")
  .get(getAssignedMemberByScheduleId);

export default router;
