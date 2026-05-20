var admin = require("firebase-admin");

let credential;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // Render/production: read from environment variable
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  credential = admin.credential.cert(serviceAccount);
} else {
  // Local development: read from file
  var serviceAccount = require("../config/fbServiceAccountKey.json");
  credential = admin.credential.cert(serviceAccount);
}

admin.initializeApp({ credential });

module.exports = admin;
