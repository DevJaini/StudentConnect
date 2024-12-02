import Joi from "joi";
import validateRequest from "../middleware/validate.middleware.js"; // Assuming this is a named export

// Define the listing validation schema
const marketplaceSchema = Joi.object({
  user_id: Joi.number().required().messages({
    "string.empty": "User ID is required",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive number",
    "any.required": "Price is required",
  }),
  category: Joi.string().required().messages({
    "string.empty": "category is required",
  }),
  city: Joi.string().required().messages({
    "string.empty": "Location is required",
  }),
  category: Joi.string().required().messages({
    "string.empty": "Category is required",
  }),
  address: Joi.string().required().messages({
    "string.empty": "address is required",
  }),
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  description: Joi.optional(),
  condition: Joi.string().required().messages({
    "string.empty": "Condition is required",
  }),
  images: Joi.optional(),
});

// Export middleware using common validation
export const validateMarketplace = validateRequest(marketplaceSchema); // Named export
