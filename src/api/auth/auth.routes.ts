import { Router } from 'express';
import { deleteUser, login, register } from './auth.controller';

const router = Router();
router.route('/login').post(login);
router.route('/register').post(register);
router.route('/:user_id').delete(deleteUser);

export default router;
