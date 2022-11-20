import { Router } from "express";
import MembersRoutes from "./members/members.routes";
import EventsRoutes from "./events/events.routes";

const router = Router();
router.use("/members", MembersRoutes);
router.use("/events", EventsRoutes);

export default router;
