import { create } from '../services/application.service.js';

export const createApplication = async(req, res) => {
    try {
        const application = await create(req.body, req.user.id);

        res.status(201).json({
            success: true,
            message : "Application created successfully",
            application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}