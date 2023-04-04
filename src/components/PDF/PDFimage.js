
// import firebase from "firebase/app";
import { initializeApp } from "firebase/app";

import "firebase/storage";
import pdfjsLib from "pdfjs-dist";
import React, { useEffect, useState } from "react";

export function PDFimage({ firebaseConfig, bucketName, filePath }) {
    const [imageUrl, setImageUrl] = useState("");
  
    useEffect(() => {
      // Configura Firebase
      const firebase= initializeApp(firebaseConfig);
    //   const storages = getStorage(firebase)
      const storage = firebase.storage().ref(bucketName);
  
      // Obtiene el archivo PDF
      storage.child(filePath).getDownloadURL().then(url => {
        // Carga el PDF en memoria
        pdfjsLib.getDocument(url).promise.then(pdf => {
          // Obtiene la primera página del PDF
          pdf.getPage(1).then(page => {
            // Carga la página como una imagen
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            const viewport = page.getViewport({ scale: 1 });
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            page.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
              const imageDataUrl = canvas.toDataURL();
              setImageUrl(imageDataUrl);
            });
          });
        });

      });
    }, []);
  
    return (
      <img src={imageUrl} alt="PDF Imagex" />
    );
  }