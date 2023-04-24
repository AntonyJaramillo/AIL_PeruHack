import { Header } from "../../components/Header";
import "./css/Reading.css";
import { uploadBooks, resFile } from "../../firebase-config";
import { useState, useEffect } from "react";
import { MyPDFViewer } from "../../components/PDF/MyPDFViewer";
// import { PDFimage } from "../../components/PDF/PDFimage";
// import { Dic } from "../../components/DicTraductor/Dic";

export const Reading = () => {
  const [file, setfile] = useState(null);
  const [respfiles, setRespFiles] = useState(0);
  // const [paths, setPaths] = useState(null);
  //!AGREGADO
  const [path, setPath] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultado = await uploadBooks(file.filex, file.name);
      // console.log(resultado);
      myFunction();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    myFunction();
  }, [respfiles]);

  async function myFunction() {
    try {
      const res = await resFile();
      //!AGREGADO
      if (res.items.length >= 1) {
        setPath(res.items[0]._location.path_);
      }
      //!
      setRespFiles(res.items.length);
    } catch (error) {
      console.log("Ocurrió un error al obtener la constante 'res':", error);
    }
  }

  return (
    <div className="reading-section">
      <Header text="My Readings" imgURL={require("../../img/read.png")} />
      <div className="reading-content">
        {(respfiles === 0 && (
          <>
            <h2>
              <span>
                <img src={require("../../img/Reading/book2.png")} alt="" />
              </span>
              "A reader lives a thousand lives before he dies"
            </h2>
            <p>
              Aún no has agregado ningún libro o documento. Empieza agregando
              uno aquí.
            </p>
            <form onSubmit={handleSubmit} className="form-add-file">
              <input
                type="file"
                name="file"
                id="file"
                onChange={(e) =>
                  setfile({
                    filex: e.target.files[0],
                    name: e.target.files[0].name,
                  })
                }
                required
                className="input-file"
              />

              <div className="arrow-btn-container">
                <div className="arrow-container">
                  <img src={require("../../img/Reading/arrow.png")} alt="" />
                </div>

                <div className="add-file-container">
                  <button className="btn-addFile">
                    <span>Add File</span>
                  </button>
                </div>
              </div>
            </form>
            <img src={require("../../img/Reading/reading-book.png")} alt="" />
          </>
        )) || (
          <>
            {path != null && <MyPDFViewer url={path} />}
          </>
        )}
      </div>
    </div>
  );
};
