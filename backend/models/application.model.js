import mongoose from 'mongoose';
import { APPLICATION_SOURCE, APPLICATION_STATUS } from '../constants/application.constants.js';

const applicationSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        jobTitle: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        dateApplied: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: Object.values(APPLICATION_STATUS),
            require: true,
            default: APPLICATION_STATUS.APPLIED
        },
        jobLink: {
            type: String,
            trim: true
        },
        location: {
            type: String,
            trim: true,
            minlength: 1
        },
        salary: {
            type: String,
            trim: true
        },
        notes: {
            type: String,
            trim: true
        },
        contactName: {
            type: String,
            trim: true
        },
        contactEmail: {
            type: String,
            lowercase: true,
            trim: true,
            match: [
                /^\S+@S+\.\S+$/,
                "please provide a valid email address"
            ]
        },
        source: {
            type: String,
            enum: Object.values(APPLICATION_SOURCE),
            required: true,
            default: APPLICATION_SOURCE.OTHERS
        },
        intervewDateTime: {
            type: Date
        },
        lastStatusUpdatedAt: {
            type: Date
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    { timestamps: true }
);

const Application = mongoose.model('Application', applicationSchema);

export default Application;