// Validation function
export const validateField = (name, value) => {
  const errors = {};

  switch (name) {
    case "author":
      if (value.trim().length > 0 && value.trim().length < 2) {
        errors.author = "Author must be at least 2 characters long";
      } else if (value.trim().length > 50) {
        errors.author = "Author must be less than 50 characters";
      }
      break;

    case "text":
      if (value.trim().length > 0 && value.trim().length < 3) {
        errors.text = "Text must be at least 3 characters long";
      } else if (value.trim().length > 100) {
        errors.text = "Text must be less than 100 characters";
      }
      break;

    case "category":
      if (value.includes("_")) {
        errors.category = "Category cannot contain (_) character";
      } else if (value.trim().length > 0 && value.trim().length < 2) {
        errors.category = "Category must be at least 2 characters long";
      } else if (value.trim().length > 30) {
        errors.category = "Category must be less than 30 characters";
      }
      break;

    case "limit":
      const limitValue = parseInt(value);
      if (isNaN(limitValue) || limitValue < 1 || limitValue > 50) {
        errors.limit = "Limit must be between 1 and 50";
      }
      break;

    default:
      break;
  }

  return errors;
};
