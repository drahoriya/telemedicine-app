const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");

setGlobalOptions({ region: "asia-south1" });

// Set env vars before loading the app
process.env.NODE_ENV = "production";
process.env.PORT = "8080";
process.env.MONGODB_URL = "mongodb+srv://devrahoriya031_db_user:Izga4Y0tQfQb9bl9@cluster0.im4utf0.mongodb.net/telemedicine?appName=Cluster0";
process.env.WEB_FRONTEND_URL = "https://medi-consult-b6113.web.app";
process.env.CLOUDINARY_CLOUD_NAME = "dsyenxpcz";
process.env.CLOUDINARY_API_KEY = "592682159347271";
process.env.CLOUDINARY_API_SECRET = "OF8n1mTI3PkQHeQXqjDeRPOHwAw";
process.env.LIVEKIT_API_KEY = "API6Fu5sYj2MRcj";
process.env.LIVEKIT_API_SECRET = "EdUfvLqEqEINByZcAz1AjjNY0nvDkghVSSvD0SBgoZL";
process.env.GEMINI_API_KEY = "AIzaSyA5e93Iun6K4ZQmmC5miMW7s6RNmazqjSQ";

const app = require("../apps/backend/src/app");

exports.api = onRequest(
  { timeoutSeconds: 60, memory: "512MiB", concurrency: 80 },
  app
);
