import React, { useState, useEffect } from 'react';
import { getDocument } from 'pdfjs-dist';

export function PDFTextExtractor({ pdfUrl }) {
  const [text, setText] = useState('');

  useEffect(() => {
    getDocument(pdfUrl).promise.then((pdf) => {
      const page = pdf.getPage(1);
      page.getTextContent().then((textContent) => {
        const extractedText = textContent.items.map((item) => item.str).join('');
        setText(extractedText);
      });
    }).catch((error) => {
      console.error(`Error al cargar el documento PDF: ${error}`);
    });
  }, [pdfUrl]);

  return (
    <div>
      <p>{text}</p>
    </div>
  );
}