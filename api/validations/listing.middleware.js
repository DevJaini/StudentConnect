import Joi from "joi";
import validateRequest from "../middleware/validate.middleware.js"; // Assuming this is a named export

// Define the listing validation schema
const listingSchema = Joi.object({
  city: Joi.string().required().messages({
    "string.empty": "Location is required",
  }),

  size: Joi.string().required().messages({
    "string.empty": "Size is required",
  }),
  bathrooms: Joi.string().required().messages({
    "string.empty": "Bathrooms is required",
  }),
  state: Joi.string().required().messages({
    "string.empty": "State is required",
  }),
  address: Joi.string().required().messages({
    "string.empty": "Address is required",
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
  type: Joi.string().required().messages({
    "string.empty": "Type of house is required",
  }),
  images: Joi.optional(),
  user_id: Joi.number().required().messages({
    "string.empty": "User ID is required",
  }),
  description: Joi.optional(),
  category: Joi.string().required().messages({
    "string.empty": "Category is required",
  }),
  facilities: Joi.optional(),
  offers: Joi.optional(),
  fees_policies: Joi.optional(),
});

// Export middleware using common validation
export const validateListing = validateRequest(listingSchema); // Named export
