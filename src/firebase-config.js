// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  connectStorageEmulator,
} from "firebase/storage";

//!TEMPORAL
import { MyPDFViewer } from "./components/PDF/MyPDFViewer";
//!TEMPORAL

// import firebase from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvYNQgWY02PzWg1Jsegl_v6-Q3xw30KLo",
  authDomain: "peru-hack.firebaseapp.com",
  projectId: "peru-hack",
  storageBucket: "peru-hack.appspot.com",
  messagingSenderId: "399670618706",
  appId: "1:399670618706:web:495f6e7b8e2d66c34bcd8b"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Nos conectamos al getStorage
export const storage = getStorage(app);
export async function uploadBooks(file, name) {
  const storageref = ref(storage, "books/" + name);
  return await uploadBytes(storageref, file);
}

const folderRef = ref(storage, "books/");

export const resFile = async () => {
  try {
  const res = await listAll(folderRef);
  // console.log(`La carpeta contiene ${res.items.length} elementos`);
  return res; // Devuelve el valor de "res" como una promesa resuelta
} catch (error) {
  console.log(
    "Ocurrió un error al verificar cuántos elementos hay en la carpeta:",
    error
  );
  throw error; // Lanza el error como una promesa rechazada
}
};


// try {
//   const res = await listAll(folderRef);
//   console.log(`La carpeta contiene ${res.items.length} elementos`);
//   console.log(res);
// } catch (error) {
//   console.log(
//     "Ocurrió un error al verificar cuántos elementos hay en la carpeta:",
//     error
//   );
// }

// listAll(folderRef)
//   .then((res) => {
//     console.log(`La carpeta contiene ${res.items.length} elementos`);
//     console.log(res);
//   })
//   .catch((error) => {
//     console.log(
//       "Ocurrió un error al verificar cuántos elementos hay en la carpeta:",
//       error
//     );
//   });

//Download PDF

// const fileRef = ref(storage, 'books/prueba.pdf');

// getDownloadURL(fileRef).then((url) => {
//   // const iframe = document.createElement('iframe');
//   // iframe.src = url;
//   // iframe.width = '100%';
//   // iframe.height = '600px';
//   // console.log(url);
// }).catch((error) => {
//   console.log('Ocurrió un error al obtener la URL del archivo PDF:', error);
// });

// export function obtenerURLdeDescarga() {
//   const fileRef = ref(storage,'books/fucking_prueba.pdf' );
//   return getDownloadURL(fileRef);
// }
//! Probando:
export function obtenerURLdeDescarga(path) {
  const fileRef = ref(storage,path );
  return getDownloadURL(fileRef);
}

//Firebase Emulator

// if (window.location.hostname === "localhost") {
//   connectAuthEmulator(auth, "http://localhost:9099");
//   connectFirestoreEmulator(db, "localhost", 8080);
//   connectStorageEmulator(storage, "localhost", 9199);
// }
