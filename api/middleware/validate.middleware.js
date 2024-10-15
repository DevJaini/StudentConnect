const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((err) => err.message);
      return res.status(400).json({ errors: errorMessages });
    }

    // Proceed to next middleware or route handler
    next();
  };
};

// Export the validateRequest function using ES6 syntax
export default validateRequest; // This exports validateRequest as the default export
