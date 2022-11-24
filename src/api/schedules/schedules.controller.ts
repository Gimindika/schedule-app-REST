import { RequestHandler, Response } from "express";
import {
  IAddScheduleReq,
  IAssignMemberReq,
  IDeleteScheduleReq,
  IGetAssignedMemberReq,
  IGetSchedulesReq,
  IRemoveAssignedMemberReq,
  ISchedule,
  IUpdateScheduleReq,
} from "./schedules.model";
import * as SchedulesService from "./schedules.service";

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
 * Inserts a new schedule record
 *
 * @param req Express IAddScheduleReq
 * @param res Express Response
 */
export const addSchedule: RequestHandler = async (
  req: IAddScheduleReq,
  res: Response
) => {
  try {
    const result = await SchedulesService.addSchedule(req.body);
    res.status(200).json({
      result,
    });
  } catch (error) {
    console.error(
      "[schedules.controller][addSchedule][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when adding new Schedule",
    });
  }
};

/**
 * Updates existing schedule record
 *
 * @param req Express IUpdateScheduleReq
 * @param res Express Response
 */
// @ts-ignore
export const updateSchedule: RequestHandler = async (
  req: IUpdateScheduleReq,
  res: Response
) => {
  try {
    const result = await SchedulesService.updateSchedule({
      ...req.body,
      schedule_id: req.params.schedule_id,
    });

    res.status(200).json({
      result,
    });
  } catch (error) {
    console.error(
      "[schedules.controller][updateSchedule][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when updating schedule",
    });
  }
};

/**
 * deletes a Member
 *
 * @param req Express IDeleteScheduleReq
 * @param res Express Response
 */
// @ts-ignore
export const deleteSchedule: RequestHandler = async (
  req: IDeleteScheduleReq,
  res: Response
) => {
  try {
    const result = await SchedulesService.deleteSchedule(
      req.params.schedule_id
    );

    res.status(200).json({
      result,
    });
  } catch (error) {
    console.error(
      "[schedules.controller][deleteSchedule][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when deleting schedule",
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

/**
 * Assign member to a schedule
 *
 * @param req Express IAssignMemberReq
 * @param res Express Response
 */
// @ts-ignore
export const assignMemberToSchedule: RequestHandler = async (
  req: IAssignMemberReq,
  res: Response
) => {
  try {
    const result = await SchedulesService.assignMemberToSchedule(
      req.params.schedule_id,
      req.params.member_id
    );

    res.status(200).json({
      result,
    });
  } catch (error) {
    console.error(
      "[schedules.controller][assignMemberToSchedule][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when assigning member",
    });
  }
};

/**
 * Remove assigned member from a schedule
 *
 * @param req Express IRemoveAssignedMemberReq
 * @param res Express Response
 */
// @ts-ignore
export const removeAssignedMember: RequestHandler = async (
  req: IRemoveAssignedMemberReq,
  res: Response
) => {
  try {
    const result = await SchedulesService.removeAssignedMember(
      req.params.schedule_id,
      req.params.member_id
    );

    res.status(200).json({
      result,
    });
  } catch (error) {
    console.error(
      "[schedules.controller][removeAssignedMember][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when removing assigned member",
    });
  }
};
