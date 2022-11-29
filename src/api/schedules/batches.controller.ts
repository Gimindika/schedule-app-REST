import { Request, RequestHandler, Response } from 'express';
import { IEvent } from '../events/events.model';
import { getEvents } from '../events/events.service';
import { days, getDaysInMonth, months } from '../helpers/getDaysInMonth';
import {
	IAddBatchReq,
	IDeleteBatchReq,
	IUpdateBatchReq,
} from './batches.model';
import * as BatchesService from './batches.service';

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

		const events = await getEvents();

		let insertSchedulesQuery = `
        INSERT INTO schedules(schedule_date, event_id, batch_id) VALUES `;

		events.map((event: IEvent, eventIndex: number) => {
			const month = months[schedule_month];
			const year = schedule_year;
			const dates = getDaysInMonth(month, year, days[event.recurrence]);

			dates.forEach((d, dateIndex: number) => {
				const lastEntry =
					dateIndex === dates.length - 1 && eventIndex === events.length - 1;
				insertSchedulesQuery += ` ('${year}-${month.toString()}-${d}', ${
					event.event_id
				}, ${batch_id}) ${lastEntry ? ';' : ','}`;
			});
		});

		try {
			await BatchesService.insertSchedules(insertSchedulesQuery);
		} catch (insertScheduleError) {
			if (insertScheduleError) {
				BatchesService.deleteBatch(batch_id);
				return res.status(500).json({
					message: 'There was an error when inserting schedules for new batch',
				});
			}
		}

		res.status(201).json({
			data: { batch_id, schedule_month, schedule_year },
		});
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
		await BatchesService.updateBatch({
			...req.body,
			batch_id: req.params.batch_id,
		});

		res.status(200).json({
			data: {
				...req.body,
				batch_id: req.params.batch_id,
			},
		});
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
