export const SchedulesQueries = {
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
