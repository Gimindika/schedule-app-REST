import { Request, RequestHandler, Response } from 'express';
import { IEvent } from '../events/events.model';
import { getEvents } from '../events/events.service';
import { days, getDaysInMonth, months } from '../helpers/getDaysInMonth';
import {
	IAddBatchReq,
	IBatch,
	IDeleteBatchReq,
	IUpdateBatchReq,
} from './batches.model';
import * as BatchesService from './batches.service';

const generateSchedulesInBatch = async (batch: IBatch) => {
	const events = await getEvents();

	let insertSchedulesQuery = `
        INSERT INTO schedules(schedule_date, event_id, batch_id) VALUES `;

	events.map((event: IEvent, eventIndex: number) => {
		const month = months[batch.schedule_month];
		const year = batch.schedule_year;
		const dates = getDaysInMonth(month, year, days[event.recurrence]);

		dates.forEach((d, dateIndex: number) => {
			const lastEntry =
				dateIndex === dates.length - 1 && eventIndex === events.length - 1;
			insertSchedulesQuery += ` ('${year}-${month.toString()}-${d}', ${
				event.event_id
			}, ${batch.batch_id}) ${lastEntry ? ';' : ','}`;
		});
	});

	try {
		await BatchesService.insertSchedules(insertSchedulesQuery);
		return true;
	} catch (insertScheduleError) {
		if (insertScheduleError) {
			BatchesService.deleteBatch(batch.batch_id);
			console.log('There was an error when inserting schedules for new batch');
			return false;
		}
	}
};

/**
 * Get active batches records
 *
 * @param req Express Request
 * @param res Express Response
 */
export const getBatches: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const batches = await BatchesService.getBatches();

		if (batches.length) {
			return res.status(200).json({
				data: batches,
			});
		} else {
			return res.status(204).json({});
		}
	} catch (error) {
		console.error(
			'[schedules.controller][getBatches][Error] ',
			typeof error === 'object' ? JSON.stringify(error) : error
		);
		res.status(500).json({
			message: 'There was an error when fetching batches',
		});
	}
};

/**
 * Inserts a new batch record based
 *
 * @param req Express IAddBatchReq
 * @param res Express Response
 */
export const addBatch: RequestHandler = async (
	req: IAddBatchReq,
	res: Response
) => {
	try {
		const { schedule_month, schedule_year } = req.body;
		const batch_id = await BatchesService.addBatch(req.body);

		const generaateScheduleResult = await generateSchedulesInBatch({
			batch_id,
			schedule_month,
			schedule_year,
		});

		if (generaateScheduleResult) {
			return res.status(201).json({
				data: { batch_id, schedule_month, schedule_year },
			});
		} else {
			return res.status(500).json({
				message: 'There was an error when inserting schedules for new batch',
			});
		}
	} catch (error) {
		console.error(
			'[schedule.controller][addBatch][Error] ',
			typeof error === 'object' ? JSON.stringify(error) : error
		);
		res.status(500).json({
			message: 'There was an error when adding new batch',
		});
	}
};

/**
 * Updates existing batch record
 *
 * @param req Express IUpdateBatchReq
 * @param res Express Response
 */
// @ts-ignore
export const updateBatchById: RequestHandler = async (
	req: IUpdateBatchReq,
	res: Response
) => {
	try {
		const { batch_id } = req.params;
		const { schedule_month, schedule_year } = req.body;
		await BatchesService.updateBatch({
			...req.body,
			batch_id,
		});

		// Clear current schedules under batch
		await BatchesService.clearSchedules(batch_id);

		// Generate new schedules for updated batch
		const generaateScheduleResult = await generateSchedulesInBatch({
			batch_id,
			schedule_month,
			schedule_year,
		});

		if (generaateScheduleResult) {
			return res.status(200).json({
				data: { batch_id, schedule_month, schedule_year },
			});
		} else {
			return res.status(500).json({
				message: 'There was an error when inserting schedules for new batch',
			});
		}
	} catch (error) {
		console.error(
			'[schedule.controller][updateBatchById][Error] ',
			typeof error === 'object' ? JSON.stringify(error) : error
		);
		res.status(500).json({
			message: 'There was an error when updating batch',
		});
	}
};

/**
 * deletes a batch
 *
 * @param req Express IDeleteBatchReq
 * @param res Express Response
 */
// @ts-ignore
export const deleteBatchById: RequestHandler = async (
	req: IDeleteBatchReq,
	res: Response
) => {
	try {
		await BatchesService.deleteBatch(req.params.batch_id);

		res.status(204).json({});
	} catch (error) {
		console.error(
			'[schedule.controller][deleteBatchById][Error] ',
			typeof error === 'object' ? JSON.stringify(error) : error
		);
		res.status(500).json({
			message: 'There was an error when deleting batch',
		});
	}
};
