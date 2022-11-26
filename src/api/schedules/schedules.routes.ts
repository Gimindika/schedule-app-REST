import { Router } from 'express';
import {
	addSchedule,
	assignMemberToSchedule,
	deleteSchedule,
	getAssignedMemberByScheduleId,
	removeAssignedMember,
	updateSchedule,
} from './schedules.controller';
import { authorize } from '../middlewares/auth.middleware';

const router = Router();
router.route('/').post(authorize(['addSchedule', 'allAccess']), addSchedule);
router
	.route('/:schedule_id')
	.patch(authorize(['updateSchedule', 'allAccess']), updateSchedule);
router
	.route('/:schedule_id')
	.delete(authorize(['deleteSchedule', 'allAccess']), deleteSchedule);
router
	.route('/:schedule_id/members/')
	.get(
		authorize(['getAssignedMember', 'allAccess']),
		getAssignedMemberByScheduleId
	);
router
	.route('/:schedule_id/members/:member_id')
	.post(authorize(['assignMember', 'allAccess']), assignMemberToSchedule);
router
	.route('/:schedule_id/members/:member_id')
	.delete(
		authorize(['removeAssignedMember', 'allAccess']),
		removeAssignedMember
	);

export default router;
