// useForm: Custom hook for handling form state, validation, and submission with Formik
import { useState, useCallback } from 'react';
import { useFormik } from 'formik';

/**
 * useForm - Custom hook to manage form state, validation, and submission logic using Formik.
 * @param {object} initialValues - Initial form values
 * @param {object} validationSchema - Yup validation schema
 * @param {function} onSubmit - Submit handler
 * @param {object} options - Additional options (resetOnSuccess, onError, enableReinitialize, formikOptions)
 * @returns {object} Formik helpers and custom state
 */
export const useForm = (initialValues, validationSchema, onSubmit, options = {}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handles form submission, error, and success state
  const handleSubmit = useCallback(
    async (values, formikBag) => {
      const { setSubmitting, resetForm, setFieldError } = formikBag;
      try {
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(false);
        const result = await onSubmit(values, formikBag);
        if (options.resetOnSuccess !== false) {
          resetForm();
        }
        setSubmitSuccess(true);
        return result;
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        // Handle field-specific errors
        if (error.response?.data?.errors) {
          Object.entries(error.response.data.errors).forEach(([field, message]) => {
            setFieldError(field, message);
          });
        }
        setSubmitError(errorMessage);
        setSubmitSuccess(false);
        if (options.onError) {
          options.onError(error);
        }
      } finally {
        setIsSubmitting(false);
        setSubmitting(false);
      }
    },
    [onSubmit, options]
  );

  // Initialize Formik with provided options
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: options.enableReinitialize || false,
    ...options.formikOptions,
  });

  // Reset form and clear error/success state
  const resetForm = useCallback(() => {
    formik.resetForm();
    setSubmitError(null);
    setSubmitSuccess(false);
  }, [formik]);

  // Clear error/success state only
  const clearErrors = useCallback(() => {
    setSubmitError(null);
    setSubmitSuccess(false);
  }, []);

  return {
    ...formik,
    isSubmitting,
    submitError,
    submitSuccess,
    resetForm,
    clearErrors,
  };
};