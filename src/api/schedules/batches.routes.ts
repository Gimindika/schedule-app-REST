import { Router } from "express";
import {
  addBatch,
  deleteBatchById,
  getBatches,
  updateBatchById,
} from "./batches.controller";
import { getSchedulesByBatchId } from "./schedules.controller";

const router = Router();
router.route("/").get(getBatches);
router.route("/:batch_id").get(getSchedulesByBatchId);
router.route("/").post(addBatch);
router.route("/:batch_id").patch(updateBatchById);
router.route("/:batch_id").delete(deleteBatchById);

export default router;
