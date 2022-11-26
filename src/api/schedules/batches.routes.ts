import { Router } from 'express';
import {
	addBatch,
	deleteBatchById,
	getBatches,
	updateBatchById,
} from './batches.controller';
import { getSchedulesByBatchId } from './schedules.controller';
import { authorize } from '../middlewares/auth.middleware';

const router = Router();
router.route('/').get(authorize(['getBatches', 'allAccess']), getBatches);
router
	.route('/:batch_id')
	.get(authorize(['getSchedules', 'allAccess']), getSchedulesByBatchId);
router.route('/').post(authorize(['addBatch', 'allAccess']), addBatch);
router
	.route('/:batch_id')
	.patch(authorize(['updateBatch', 'allAccess']), updateBatchById);
router
	.route('/:batch_id')
	.delete(authorize(['deleteBatch', 'allAccess']), deleteBatchById);

export default router;
