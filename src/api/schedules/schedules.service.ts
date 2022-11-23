import { execute } from "./../utils/mysql.connector";

import { IAssignedMember, ISchedule } from "./schedules.model";
import { SchedulesQueries } from "./schedules.queries";

export const getSchedulesByBatchId = async (
  batch_id: ISchedule["batch_id"]
) => {
  return execute<ISchedule[]>(SchedulesQueries.GetSchedulesByBatchId, [
    batch_id,
  ]);
};

export const getAssignedMemberByScheduleId = async (
  schedule_id: IAssignedMember["schedule_id"]
) => {
  return execute<IAssignedMember[]>(
    SchedulesQueries.GetAssignedMemberByScheduleId,
    [schedule_id]
  );
};
