
export const validateMaxLength = (value, maxLength, setErrors) => {
    if (value.length > maxLength) {
      setErrors(`Only ${maxLength} characters are allowed.`);
      return value.slice(0, maxLength);
    } else {
      setErrors('');
      return value;
    }
  };
  