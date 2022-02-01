import { firebaseApp } from "./firebaseApp";
import { getFirestore, collection, query, where, doc, getDocs, getDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export async function getDocData(collection: string, docId: string) {
  const docRef = doc(db, collection, docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return undefined;
  }
}

// export async function getAllFromCollection(collectionName: string): Promise<any[]> {
//   const productsRef = await db.collection(collectionName);
//   const prodsSnap = await productsRef.get();
//   const prods = prodsSnap.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
//   return prods;
// }
