import Application from '../models/application.model.js';
import formatText from '../utils/format-text.util.js';
import { APPLICATION_STATUS } from '../constants/application.constants.js';

export const create = async (applicationData, userId) => {
    let {
        companyName,
        jobTitle,
        dateApplied,
        status,
        jobLink,
        location,
        salary,
        notes,
        contactName,
        contactEmail,
        source,
        interviewDateTime,
    } = applicationData;

    // Format text fields
    companyName = formatText(companyName);
    jobTitle = formatText(jobTitle);
    location = formatText(location);
    contactName = formatText(contactName);

    // Validate interview date
    if (
        status === APPLICATION_STATUS.INTERVIEW_SCHEDULED &&
        !interviewDateTime
    ) {
        throw new Error(
            "Interview date and time is required when status is Interview Scheduled"
        );
    }

    // Remove interview date for non-interview statuses
    if (status !== APPLICATION_STATUS.INTERVIEW_SCHEDULED) {
        interviewDateTime = undefined;
    }

    const existingApplication = await Application.findOne({
        companyName,
        jobTitle,
        user: userId,
    });

    if (existingApplication) {
        throw new Error("Application already exists");
    }

    // Create application
    const application = await Application.create({
        companyName,
        jobTitle,
        dateApplied,
        status,
        jobLink,
        location,
        salary,
        notes,
        contactName,
        contactEmail,
        source,
        interviewDateTime,
        user: userId,
    });

    return application;
};