import { Request, RequestHandler, Response } from "express";
import {
  IAddEventReq,
  IDeleteEventReq,
  IGetEventReq,
  IUpdateEventReq,
} from "./events.model";
import * as EventsService from "./events.service";
/**
 * Get active Event records
 *
 * @param req Express Request
 * @param res Express Response
 */
export const getEvents: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const events = await EventsService.getEvents();

    res.status(200).json({
      events,
    });
  } catch (error) {
    console.error(
      "[Events.controller][getEvents][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when fetching Events",
    });
  }
};

/**
 * Get Event record based on event_id provided
 *
 * @param req Express IGetEventReq
 * @param res Express Response
 */
// @ts-ignore
export const getEventById: RequestHandler = async (
  req: IGetEventReq,
  res: Response
) => {
  try {
    const event = await EventsService.getEventById(req.params.event_id);

    res.status(200).json({
      event,
    });
  } catch (error) {
    console.error(
      "[Events.controller][getEventById][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when fetching Event",
    });
  }
};

/**
 * Inserts a new Event record based
 *
 * @param req Express IAddEventReq
 * @param res Express Response
 */
export const addEvent: RequestHandler = async (
  req: IAddEventReq,
  res: Response
) => {
  try {
    const result = await EventsService.insertEvent(req.body);
    res.status(200).json({
      result,
    });
  } catch (error) {
    console.error(
      "[Events.controller][addEvent][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when adding new Event",
    });
  }
};

/**
 * Updates existing Event record
 *
 * @param req Express IUpdateEventReq
 * @param res Express Response
 */
// @ts-ignore
export const updateEventById: RequestHandler = async (
  req: IUpdateEventReq,
  res: Response
) => {
  try {
    const result = await EventsService.updateEvent({
      ...req.body,
      event_id: req.params.event_id,
    });

    res.status(200).json({
      result,
    });
  } catch (error) {
    console.error(
      "[Events.controller][updateEventById][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when updating Event",
    });
  }
};

/**
 * deletes a Event
 *
 * @param req Express IDeleteEventReq
 * @param res Express Response
 */
// @ts-ignore
export const deleteEventById: RequestHandler = async (
  req: IDeleteEventReq,
  res: Response
) => {
  try {
    const result = await EventsService.deleteEvent(req.params.event_id);

    res.status(200).json({
      result,
    });
  } catch (error) {
    console.error(
      "[Events.controller][deleteEventById][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when deleting Event",
    });
  }
};
