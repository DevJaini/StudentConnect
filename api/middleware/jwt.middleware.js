import jwt from "jsonwebtoken";

// Middleware for authenticating the JWT Token
export const authenticate = (req, res, next) => {
  // Extract token from headers
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase

  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length); // Remove Bearer from string
    }

    console.log("token", token);

    // Verify the token using the secret key
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ error: "Authentication token is invalid" });
      }

      // Attach decoded token to request (could contain student info)
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({ error: "Authentication token not supplied" });
  }
};

// Function for Generating a new JWT Token
export const generateToken = (user) => {
  // Payload can contain the student ID or other necessary user information
  const payload = {
    userId: user.id,
    email: user.email,
    username: user.username,
  };

  // Sign the JWT token using the secret key and an expiry time
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRY || "1d",
  });

  return token;
};
