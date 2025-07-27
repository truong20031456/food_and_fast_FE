// API Helpers: response, error, validation, error handler for hooks

export const createApiResponse = (success, data = null, error = null) => ({
    success,
    data,
    error
});

export const handleApiError = (error, defaultMessage = 'An error occurred') => {
    const message = error.response?.data?.message || 
                   error.response?.data?.error || 
                   error.message || 
                   defaultMessage;
    return createApiResponse(false, null, message);
};

export const handleApiSuccess = (data) => {
    return createApiResponse(true, data, null);
};

/**
 * handleError - Used for custom hooks: automatically dispatch setError and log error
 * @param {function} dispatch - Redux dispatch
 * @param {object} error - Error object
 * @param {string} defaultMsg - Default error message
 */
export const handleError = (dispatch, error, defaultMsg) => {
    const errorMessage = error?.response?.data?.message || error?.message || defaultMsg;
    dispatch({ type: 'error/setError', payload: errorMessage });
    // If using slice: dispatch(setError(errorMessage));
    // If needed, you can pass the action into params
    // Log error to console
    console.error(defaultMsg, error);
};
