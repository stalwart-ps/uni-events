import { initializeApp } from "firebase/app";
import { getFirestore, doc, runTransaction } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwphOaBJQcqx1kpQQkpI5a14kS86B81XA",
  authDomain: "hptuchaitanya.firebaseapp.com",
  projectId: "hptuchaitanya",
  storageBucket: "hptuchaitanya.firebasestorage.app",
  messagingSenderId: "858720919049",
  appId: "1:858720919049:web:8bdf69e87710b0211c22d8",
  measurementId: "G-HR6H59F1E6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ---- Unique sequential ID generator (atomic) ----
export async function getNextUniqueId(prefix = "HPTU", padTo = 5) {
  const counterRef = doc(db, "meta", "counters"); // create this doc automatically on first run
  const nextNumber = await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(counterRef);
    let current = 0;
    if (!snap.exists()) {
      // initialize if needed
      transaction.set(counterRef, { usersNext: 1 });
      current = 1;
    } else {
      const data = snap.data();
      current = (data.usersNext ?? 1);
      transaction.update(counterRef, { usersNext: current + 1 });
    }
    return current;
  });

  const padded = String(nextNumber).padStart(padTo, "0");
  return `${prefix}${padded}`;
}
