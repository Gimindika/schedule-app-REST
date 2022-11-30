import { execute } from './../utils/mysql.connector';

import { IBatch } from './batches.model';
import { BatchesQueries } from './batches.queries';

export const getBatches = async () => {
	return execute<IBatch[]>(BatchesQueries.GetBatches, []);
};

export const addBatch = async (batch: IBatch) => {
	const result = await execute<{ insertId: number }>(BatchesQueries.AddBatch, [
		batch.schedule_year,
		batch.schedule_month,
	]);

	return result.insertId;
};

export const insertSchedules = async (insertSchedulesQuery: string) => {
	const result = await execute<{ affectedRows: number }>(
		insertSchedulesQuery,
		[]
	);

	return result.affectedRows > 0;
};

export const clearSchedules = async (batch_id: IBatch['batch_id']) => {
	const result = await execute<{ affectedRows: number }>(
		BatchesQueries.ClearSchedules,
		[batch_id]
	);

	return result.affectedRows > 0;
};

export const updateBatch = async (batch: IBatch) => {
	const result = await execute<{ affectedRows: number }>(
		BatchesQueries.UpdateBatch,
		[batch.schedule_year, batch.schedule_month, batch.batch_id]
	);
	return result.affectedRows > 0;
};

export const deleteBatch = async (batch_id: IBatch['batch_id']) => {
	const result = await execute<{ affectedRows: number }>(
		BatchesQueries.DeleteBatch,
		[batch_id]
	);
	return result.affectedRows > 0;
};
