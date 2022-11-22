import { Request, RequestHandler, Response } from "express";
import {
  IGetAssignedMemberReq,
  IGetSchedulesReq,
  ISchedule,
} from "./schedules.model";
import * as SchedulesService from "./schedules.service";
/**
 * Get active member records
 *
 * @param req Express Request
 * @param res Express Response
 */
export const getBatches: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const batches = await SchedulesService.getBatches();

    res.status(200).json({
      batches,
    });
  } catch (error) {
    console.error(
      "[schedules.controller][getBatches][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when fetching batches",
    });
  }
};

/**
 * Get Schedules record based on batch_id provided
 *
 * @param req Express IGetMemberReq
 * @param res Express Response
 */
// @ts-ignore
export const getSchedulesByBatchId: RequestHandler = async (
  req: IGetSchedulesReq,
  res: Response
) => {
  try {
    let results: ISchedule[] = [];

    const schedules = await SchedulesService.getSchedulesByBatchId(
      req.params.batch_id
    );

    schedules.map(async (schedule, index) => {
      const members = await SchedulesService.getAssignedMemberByScheduleId(
        schedule.schedule_id
      );

      results.push({
        ...schedule,
        members,
      });

      /** 
        sending response inside map block codes due to 
        non blocking nature of JS executing response 
        before schedule mapping finished
       */
      if (index === schedules.length - 1) {
        return res.status(200).json({
          schedules: results,
        });
      }
    });
  } catch (error) {
    console.error(
      "[Schedules.controller][getSchedulesByBatchId][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when fetching Schedules",
    });
  }
};

/**
 * Get Member record based on schedule_id provided
 *
 * @param req Express IGetAssignedMemberReq
 * @param res Express Response
 */
// @ts-ignore
export const getAssignedMemberByScheduleId: RequestHandler = async (
  req: IGetAssignedMemberReq,
  res: Response
) => {
  try {
    const members = await SchedulesService.getAssignedMemberByScheduleId(
      req.params.schedule_id
    );

    res.status(200).json({
      members,
    });
  } catch (error) {
    console.error(
      "[Schedules.controller][getAssignedMemberByScheduleId][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when fetching Assigned Members",
    });
  }
};
