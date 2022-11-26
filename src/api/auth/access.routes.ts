import { Router } from 'express';
import {
	addAccessType,
	deleteAccessType,
	getAccessTypes,
	updateAccessType,
} from './access.controller';
import { authorize } from '../middlewares/auth.middleware';

const router = Router();
router
	.route('/')
	.get(authorize(['getAccessTypes', 'allAccess']), getAccessTypes);
router
	.route('/')
	.post(authorize(['addAccessType', 'allAccess']), addAccessType);
router
	.route('/:batch_id')
	.patch(authorize(['updateAccessType', 'allAccess']), updateAccessType);
router
	.route('/:batch_id')
	.delete(authorize(['deleteAccessType', 'allAccess']), deleteAccessType);

export default router;
