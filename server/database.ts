const Firestore = require("@google-cloud/firestore");

const serviceAccountPath = `./service-accounts/${process.env.GCP_SERVICE_ACCOUNT_FILENAME}`;

export const db = new Firestore({
  projectId: process.env.PROJECT_ID,
  keyFilename: serviceAccountPath,
});

export async function getDocData(docPath: string) {
  const snap = await db.doc(docPath).get();
  return snap.data();
}
