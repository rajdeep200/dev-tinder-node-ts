export const ERROR_MESSAGES = {
    MONGoose_CONNECTION_ERROR: 'Could not connect to MongoDB. Please check your connection details and try again.',
    USER_NOT_FOUND: 'User not found.',
    USER_UPDATED: 'User updated',
    EMAIL_EXISTS: 'Email already exists.',
    INVALID_EMAIL: 'Invalid email address',
    BAD_REQUEST: 'Bad request. Please provide valid data.',
    INTERNAL_SERVER_ERROR: 'Internal Server Error. Please try again later.',
    EMAIL_REQUIRED: 'Email required',
    PASSWORD_REQUIRED: 'Password required',
    GENDER_REQUIRED: 'Gender required',
    PASSWORD_INCORRECT: 'Password lenth should be at least 8. It should contain at least one uppercase, lowercase, number and symbol.',
    WRONG_PASSWORD: 'Incorrect password',
    LOGIN_SUCCESS: 'Login successful',
    UNAUTH: 'Unauthorized',
}

export const ALLOWED_USER_DOC_UPDATES: string[] = ["firstName", "lastName", "password", "email"]