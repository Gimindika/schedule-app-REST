import { Router } from "express";
import EventsRoutes from "./events/events.routes";
import MembersRoutes from "./members/members.routes";
import BatchesRoutes from "./schedules/batches.routes";
import ScheduleRoutes from "./schedules/schedules.routes";

const router = Router();
router.use("/batches", BatchesRoutes);
router.use("/events", EventsRoutes);
router.use("/members", MembersRoutes);
router.use("/schedules", ScheduleRoutes);

export default router;
