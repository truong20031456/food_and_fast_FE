import { useState, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const useForm = (initialValues, validationSchema, onSubmit) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = useCallback(
    async (values, { setSubmitting, resetForm }) => {
      try {
        setIsSubmitting(true);
        setSubmitError(null);
        await onSubmit(values);
        resetForm();
      } catch (error) {
        setSubmitError(error.message);
      } finally {
        setIsSubmitting(false);
        setSubmitting(false);
      }
    },
    [onSubmit]
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const resetForm = useCallback(() => {
    formik.resetForm();
    setSubmitError(null);
  }, [formik]);

  return {
    ...formik,
    isSubmitting,
    submitError,
    resetForm,
  };
}; 