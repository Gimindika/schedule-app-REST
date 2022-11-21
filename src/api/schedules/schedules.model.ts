import { Request } from "express";

export interface ISchedule {
  batch_id: number;
  schedule_date: Date;
  event_id: number;
  schedule_id: number;
  members: IAssignedMember[];
}

export interface IBatch {
  batch_id: number;
  schedule_year: number;
  schedule_month: string;
}

export interface IAssignedMember {
  schedule_id: number;
  member_id: number;
  name: string;
  profile_color: string;
}

export interface IGetSchedulesReq
  extends Request<{ batch_id: ISchedule["batch_id"] }> {}

export interface IGetAssignedMemberReq
  extends Request<{ schedule_id: ISchedule["schedule_id"] }> {}
