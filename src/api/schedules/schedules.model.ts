import { Request } from "express";
import { IMember } from "../members/members.model";

export interface ISchedule {
  batch_id: number;
  schedule_date: Date;
  event_id: number;
  schedule_id: number;
  members: IAssignedMember[];
}

export interface IAssignedMember {
  schedule_id: number;
  member_id: number;
  name: string;
  profile_color: string;
}

export interface IGetSchedulesReq
  extends Request<{ batch_id: ISchedule["batch_id"] }> {}
export interface IAddScheduleReq extends Request<{}, ISchedule, any> {}
export interface IUpdateScheduleReq
  extends Request<
    { schedule_id: ISchedule["schedule_id"] },
    ISchedule,
    ISchedule
  > {}
export interface IDeleteScheduleReq
  extends Request<
    { schedule_id: ISchedule["schedule_id"] },
    { schedule_id: ISchedule["schedule_id"] }
  > {}

export interface IGetAssignedMemberReq
  extends Request<{ schedule_id: ISchedule["schedule_id"] }> {}
export interface IAssignMemberReq
  extends Request<
    { schedule_id: ISchedule["schedule_id"] },
    ISchedule,
    { member_id: IMember["member_id"] }
  > {}
export interface IRemoveAssignedMemberReq
  extends Request<
    { schedule_id: ISchedule["schedule_id"] },
    ISchedule,
    { member_id: IMember["member_id"] }
  > {}
