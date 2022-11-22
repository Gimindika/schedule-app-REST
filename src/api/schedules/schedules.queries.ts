export const SchedulesQueries = {
  GetBatches: `
    SELECT * FROM 
      batches`,
  AddBatch: `
    INSERT INTO 
      batches(schedule_year, schedule_month)
    VALUES(?,?) `,
  UpdateBatch: `
    UPDATE 
      batches 
    SET 
      schedule_year = ?, 
      schedule_month = ? 
    WHERE 
      batch_id = ?`,
  DeleteBatch: `
    DELETE FROM
      batches
    WHERE
      batch_id = ?`,
  GetSchedulesByBatchId: `
    SELECT * FROM 
      schedules 
    WHERE 
      batch_id = ?`,
  AddSchedule: `
    INSERT INTO 
      schedules(schedule_date, event_id, batch_id)
    VALUES (?,?,?)`,
  UpdateSchedule: `
    UPDATE 
      schedules 
    SET 
      schedule_date = ?, 
      event_id = ? ,
      batch_id = ?
    WHERE 
      schedule_id = ?`,
  DeleteSchedule: `
    DELETE FROM
      schedules
    WHERE
      schedule_id = ?`,
  GetAssignedMemberByScheduleId: `
    SELECT * FROM
      assignment
    INNER JOIN members ON
      assignment.member_id = members.member_id
    WHERE
      assignment.schedule_id = ?`,
  AssignMember: `
    INSERT INTO 
      assignment(schedule_id, member_id)
    VALUES (?, ?)
  `,
  RemoveMember: `
    DELETE FROM
      assignment
    WHERE 
      schedule_id = ?
    AND
      member_id = ? 
  `,
};
