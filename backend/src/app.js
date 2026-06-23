import express from 'express';
import cors from 'cors';
import authRoutes from '../routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import applicationRoutes from '../routes/application.route.js';

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);   
app.use('/api/applications', applicationRoutes);

export default app;