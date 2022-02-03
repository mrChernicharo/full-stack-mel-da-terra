const admin = require("firebase-admin");

const serviceAccountPath = `./service-accounts/${process.env.GCP_SERVICE_ACCOUNT_FILENAME}`;

admin.initializeApp({
  projectId: process.env.PROJECT_ID,
  credential: admin.credential.cert(serviceAccountPath),
});

// console.log(admin)

// firebase-admin auth service
export const auth = admin.auth();
