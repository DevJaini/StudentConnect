import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import listingRoute from "./routes/listing.route.js";
import marketplaceRoute from "./routes/marketplace.route.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/listing", listingRoute);
app.use("/api/marketplace", marketplaceRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
