import { Router } from 'express';
import { authorize } from '../middlewares/auth.middleware';
import {
	deleteUser,
	getAccessByUserId,
	grantUserAccess,
	login,
	register,
	revokeUserAccess,
	grantAllAccess,
	updateUser,
} from './auth.controller';

const router = Router();
router.route('/login').post(login);
router.route('/register').post(register);
router
	.route('/:user_id')
	.patch(authorize(['updateUser', 'allAccess']), updateUser);
router
	.route('/:user_id')
	.delete(authorize(['deleteUser', 'allAccess']), deleteUser);

// getAccessByUserId
router
	.route('/:user_id/accesses/')
	.get(authorize(['getUserAccess', 'allAccess']), getAccessByUserId);
// grantUserAccess
router
	.route('/:user_id/accesses/:access_id')
	.post(authorize(['grantAccess', 'allAccess']), grantUserAccess);
// revokeUserAccess
router
	.route('/:user_id/accesses/:access_id')
	.delete(authorize(['revokeAccess', 'allAccess']), revokeUserAccess);
// grantAllAccess
router
	.route('/:user_id/all-access')
	.post(authorize(['grantAccess', 'allAccess']), grantAllAccess);
export default router;
