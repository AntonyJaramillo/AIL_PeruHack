import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";

import { useState, useEffect, useRef } from "react";
import { obtenerURLdeDescarga } from "../../firebase-config";
import "./Sample.css";

import pdfFile from "./prueba-ail.pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { BtnWord } from "../button/BtnWord";
import { Dic } from "../DicTraductor/Dic";
import { BtnBack } from "../button/BtnBack";

export const MyPDFViewer = ({ url }) => {
  const [urlResp, setUrlResp] = useState(null);

  // obtenerURLdeDescarga()
  //   .then((urlRes) => {
  //     console.log("URL de descarga:", urlRes);
  //     setUrlResp(urlRes);
  //   })
  //   .catch((error) => {
  //     console.log("Ocurrió un error al obtener la URL del archivo PDF:", error);
  //   });

  useEffect(() => {
    obtenerURLdeDescarga(url) // Paso la prop `url` a la función `obtenerURLdeDescarga`
      .then((urlRes) => {
        // console.log("URL de descarga:", urlRes);
        setUrlResp(urlRes);
      })
      .catch((error) => {
        console.log(
          "Ocurrió un error al obtener la URL del archivo PDF:",
          error
        );
      });
  }, [url]); // Agrego la prop `url` como dependencia

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // const [numPages, setNumPages] = useState(0);

  const [read, setRead] = useState(false);
  const handleReadPDF = () => {
    setRead(true);
  };

  const handleBackPage = () => {
    setPageNumber(pageNumber - 1);
    if (pageNumber === 1) {
      setPageNumber(1);
    }
  };

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
    if (pageNumber === numPages) {
      setPageNumber(numPages);
    }
  };

  const handleBackPDFs = () => {
    setRead(false);
  };

  return (
    <>
      {/* <iframe
        title="This is a unique title"
        src={`${urlResp}#page=1`}
        width="500"
        height="375"
      ></iframe> */}

      <div className="pdf-viewer">
        {read === false && (
          <>
            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={1} height={400} />
            </Document>

            <div className="btn-read-container" onClick={handleReadPDF}>
              <BtnWord text="Read" size={{ width: 30, height: 8 }} />
            </div>
          </>
        )}

        {read === true && (
          <>
            <div className="pdf-read-translate">
              <div className="pdf-file-viewer">
                <div className="btn-back-page" onClick={handleBackPage}>
                  <BtnWord text="<-" size={{ width: 20, height: 6 }} />
                </div>

                <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={pageNumber} height={500} />
                </Document>

                <div className="btn-next-page" onClick={handleNextPage}>
                  <BtnWord text="->" size={{ width: 20, height: 6 }} />
                </div>
              </div>

              <div className="translate-container">
                <Dic />
              </div>

            </div>

            <div className="btn-back-pdfs" onClick={handleBackPDFs}>
              <BtnBack/>
              {/* <BtnWord text="Back" size={{ width: 20, height: 6 }} /> */}
            </div>

            {/* <div className="btn-read-container">
              <BtnWord text="Back" />
            </div> */}
          </>
        )}
      </div>
    </>
  );
};
