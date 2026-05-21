import { Router } from 'express';
import { createValidationReportController } from '../controllers/validationController.js';
import { asyncHandler } from '../utils/error.js';

const router = Router();

router.post('/validate', asyncHandler(createValidationReportController));

export default router;
