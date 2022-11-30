import { Router } from 'express';
import {
	addEvent,
	deleteEventById,
	getEventById,
	getEvents,
	updateEventById,
} from './events.controller';
import { authorize } from '../middlewares/auth.middleware';

const router = Router();
router.route('/').get(authorize(['getEvents', 'allAccess']), getEvents);
router
	.route('/:event_id')
	.get(authorize(['getEvents', 'allAccess']), getEventById);
router.route('/').post(authorize(['addEvents', 'allAccess']), addEvent);
router
	.route('/:event_id')
	.patch(authorize(['updateEvents', 'allAccess']), updateEventById);
router
	.route('/:event_id')
	.delete(authorize(['deleteEvents', 'allAccess']), deleteEventById);

export default router;
