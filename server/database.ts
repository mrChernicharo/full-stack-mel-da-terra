const Firestore: any = require("@google-cloud/firestore");

const serviceAccountPath = `./service-accounts/${process.env.GCP_SERVICE_ACCOUNT_FILENAME}`;

export const db = new Firestore({
  projectId: process.env.PROJECT_ID,
  keyFilename: serviceAccountPath,
});

export async function getDocData(docPath: string): Promise<any> {
  const snap = await db.doc(docPath).get();
  return snap.data();
}

export async function getAllFromCollection(collectionName: string): Promise<any[]> {
  const productsRef = await db.collection(collectionName);
  const prodsSnap = await productsRef.get();
  const prods = prodsSnap.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  return prods;
}
