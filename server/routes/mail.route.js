import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import mailCtrl from '../controllers/mail.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.email), mailCtrl.send);

export default router;
