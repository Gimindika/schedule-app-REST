import { Router } from 'express';
import {
	addMember,
	deleteMemberById,
	getMemberById,
	getMembers,
	updateMemberById,
} from './members.controller';
import { authorize } from '../middlewares/auth.middleware';

const router = Router();
router.route('/').get(authorize(['getMembers', 'allAccess']), getMembers);
router
	.route('/:member_id')
	.get(authorize(['getMembers', 'allAccess']), getMemberById);
router.route('/').post(authorize(['addMember', 'allAccess']), addMember);
router
	.route('/:member_id')
	.patch(authorize(['updateMember', 'allAccess']), updateMemberById);
router
	.route('/:member_id')
	.delete(authorize(['deleteMember', 'allAccess']), deleteMemberById);

export default router;
