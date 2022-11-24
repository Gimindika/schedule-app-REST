import { Router } from 'express';
import {
	addAccessType,
	deleteAccessType,
	getAccessTypes,
	updateAccessType,
} from './access.controller';

const router = Router();
router.route('/').get(getAccessTypes);
router.route('/').post(addAccessType);
router.route('/:batch_id').patch(updateAccessType);
router.route('/:batch_id').delete(deleteAccessType);

export default router;
