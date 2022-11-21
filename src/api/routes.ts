import { Router } from "express";
import EventsRoutes from "./events/events.routes";
import MembersRoutes from "./members/members.routes";
import ScheduleRoutes from "./schedules/schedules.routes";

const router = Router();
router.use("/events", EventsRoutes);
router.use("/members", MembersRoutes);
router.use("/schedules", ScheduleRoutes);

export default router;
