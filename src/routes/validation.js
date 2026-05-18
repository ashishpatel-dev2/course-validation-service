import { Router } from 'express';
import { createValidationJobController } from '../controllers/validationController.js';
import { asyncHandler } from '../utils/error.js';

const router = Router();

router.post('/validate', asyncHandler(createValidationJobController));

export default router;
