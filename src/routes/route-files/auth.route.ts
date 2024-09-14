import express from 'express';
import signInUser from '../../controllers/auth-controllers/signin.controller';
import signoutUser from '../../controllers/auth-controllers/signout.controller';
import validateFields from '../../middleware/validate-fields.middleware';

export const router = express.Router();

router.post('/signin', validateFields(['email, password']), signInUser);
router.post('/signout', signoutUser);
