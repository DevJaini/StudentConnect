import Joi from "joi";
import validateRequest from "../middleware/validate.middleware.js"; // Assuming this is a named export

// Define the listing validation schema
const listingSchema = Joi.object({
  location: Joi.string().required().messages({
    "string.empty": "Location is required",
  }),
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive number",
    "any.required": "Price is required",
  }),
  school: Joi.string().min(3).required().messages({
    "string.empty": "School is required",
    "string.min": "School must be at least 3 characters long",
  }),
  type_of_house: Joi.string().valid("shared", "temporary").required().messages({
    "string.empty": "Type of house is required",
    "any.only": "Type of house must be one of [temporary, shared]",
  }),
  images: Joi.array().items(Joi.string().uri()).min(3).messages({
    "array.base": "Images must be an array of valid URLs",
    "array.min": "At least 3 images are required",
    "string.uri": "Each image must be a valid URL",
  }),
  user_id: Joi.string().required().messages({
    "string.empty": "User ID is required",
  }),
});

// Export middleware using common validation
export const validateListing = validateRequest(listingSchema); // Named export
