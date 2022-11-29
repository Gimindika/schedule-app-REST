import { IMember } from '../members/members.model';
import { execute } from './../utils/mysql.connector';

import { IAssignedMember, ISchedule } from './schedules.model';
import { SchedulesQueries } from './schedules.queries';

export const getSchedulesByBatchId = async (
	batch_id: ISchedule['batch_id']
) => {
	return execute<ISchedule[]>(SchedulesQueries.GetSchedulesByBatchId, [
		batch_id,
	]);
};

export const addSchedule = async (schedule: ISchedule) => {
	const result = await execute<{ insertId: number }>(
		SchedulesQueries.AddSchedule,
		[schedule.schedule_date, schedule.event_id, schedule.batch_id]
	);
	return result.insertId;
};

export const updateSchedule = async (schedule: ISchedule) => {
	const result = await execute<{ affectedRows: number }>(
		SchedulesQueries.UpdateSchedule,
		[
			schedule.schedule_date,
			schedule.event_id,
			schedule.batch_id,
			schedule.schedule_id,
		]
	);
	return result.affectedRows > 0;
};

export const deleteSchedule = async (schedule_id: ISchedule['schedule_id']) => {
	const result = await execute<{ affectedRows: number }>(
		SchedulesQueries.DeleteSchedule,
		[schedule_id]
	);
	return result.affectedRows > 0;
};

export const getAssignedMemberByScheduleId = async (
	schedule_id: IAssignedMember['schedule_id']
) => {
	return execute<IAssignedMember[]>(
		SchedulesQueries.GetAssignedMemberByScheduleId,
		[schedule_id]
	);
};

export const assignMemberToSchedule = async (
	schedule_id: ISchedule['schedule_id'],
	member_id: IMember['member_id']
) => {
	const result = await execute<{ affectedRows: number }>(
		SchedulesQueries.AssignMember,
		[schedule_id, member_id]
	);
	return result.affectedRows > 0;
};

export const removeAssignedMember = async (
	schedule_id: ISchedule['schedule_id'],
	member_id: IMember['member_id']
) => {
	const result = await execute<{ affectedRows: number }>(
		SchedulesQueries.RemoveAssignedMember,
		[schedule_id, member_id]
	);
	return result.affectedRows > 0;
};
