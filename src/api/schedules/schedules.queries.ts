export const SchedulesQueries = {
  GetBatches: `
    SELECT * FROM 
      batches`,
  GetSchedulesByBatchId: `
    SELECT * FROM 
      schedules 
    WHERE 
      batch_id = ?`,
  GetAssignedMemberByScheduleId: `
    SELECT * FROM
      assignment
    INNER JOIN members ON
      assignment.member_id = members.member_id
    WHERE
      assignment.schedule_id = ?`,
};
