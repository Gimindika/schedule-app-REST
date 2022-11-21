import { execute } from "./../utils/mysql.connector";

import { SchedulesQueries } from "./schedules.queries";
import { ISchedule, IBatch, IAssignedMember } from "./schedules.model";

export const getBatches = async () => {
  return execute<IBatch[]>(SchedulesQueries.GetBatches, []);
};

export const getSchedulesByBatchId = async (
  batch_id: ISchedule["batch_id"]
) => {
  return execute<ISchedule[]>(SchedulesQueries.GetSchedulesByBatchId, [batch_id]);
};

export const getAssignedMemberByScheduleId = async (
  schedule_id: IAssignedMember["schedule_id"]
) => {
  return execute<IAssignedMember[]>(SchedulesQueries.GetAssignedMemberByScheduleId, [
    schedule_id,
  ]);
};
