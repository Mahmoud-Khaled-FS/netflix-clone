export const isEmail = (value) => {
  if (value.trim().length === 0) {
    return { hasError: true, errorMessage: 'Email is required!' };
  }
  if (value.trim().length < 6) {
    return { hasError: true, errorMessage: 'Email should be between 6 and 60 characters' };
  }
  if (!value.includes('@') || !value.includes('.')) {
    return { hasError: true, errorMessage: 'Please enter a valid email address' };
  }
  return { hasError: false };
};
