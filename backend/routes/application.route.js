import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { createApplication } from '../controllers/application.controller.js';

const applicationRoutes = express.Router();

applicationRoutes.post('/', protect, createApplication);

export default applicationRoutes;
