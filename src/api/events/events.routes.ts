import { Router } from "express";
import {
  addEvent,
  deleteEventById,
  getEventById,
  getEvents,
  updateEventById,
} from "./events.controller";

const router = Router();
router.route("/").get(getEvents);
router.route("/:event_id").get(getEventById);
router.route("/").post(addEvent);
router.route("/:event_id").patch(updateEventById);
router.route("/:event_id").delete(deleteEventById);

export default router;
