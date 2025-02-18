import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBu1BxTGwTKTiVNsq45AMwLqJsN3rxF6p8",
  authDomain: "pruebalogin-c4a98.firebaseapp.com",
  projectId: "pruebalogin-c4a98",
  storageBucket: "pruebalogin-c4a98.appspot.com", // Corregido el dominio
  messagingSenderId: "233245563852",
  appId: "1:233245563852:web:93bcaec9ee4a2209d89b69",
  measurementId: "G-5KTQWL9XTC",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Función para generar el documento de usuario
export const generateUserDocument = async (user, additionalData) => {
  if (!user) return null;

  const userRef = doc(firestore, `users/${user.uid}`);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { displayName, photoURL } = user;
    try {
      await setDoc(userRef, {
        displayName,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creando el documento de usuario", error);
    }
  }
  return getUserDocument(user.uid);
};

// Función para obtener un documento de usuario
const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userRef = doc(firestore, `users/${uid}`);
    const userDocument = await getDoc(userRef);

    return userDocument.exists() ? { uid, ...userDocument.data() } : null;
  } catch (error) {
    console.error("Error obteniendo el usuario", error);
    return null;
  }
};

// Exportar módulos de autenticación y base de datos
export { auth, firestore };
