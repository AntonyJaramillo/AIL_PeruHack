import "./Custom.css";
import { useState } from "react";
import {updateWord} from "../../../firebase-crud"
export const Custom = ({ wordx, wordxMean , wordxState,wordxID }) => {
  const [word, setWord] = useState(wordx);
  const handleMean = () => {
    if (word !== wordxMean) {
      setWord(wordxMean);
    }else{
      setWord(wordx);
    }
  };

  const handleCheck = async () => {
    await updateWord(wordxID, {
      word: wordx,
      mean: wordxMean,
      state: 1,
    });
    console.log("se cambio es estado a 1:Conocido");
  };

  const handleProgress = async () => {
    await updateWord(wordxID, {
      word: wordx,
      mean: wordxMean,
      state: 0,
    });
    console.log("se cambio es estado a 0:Progreso");
  };

  const handleDesconocido = async () => {
    await updateWord(wordxID, {
      word: wordx,
      mean: wordxMean,
      state: -1,
    });
    console.log("se cambio es estado a -1 :Desconocido");
  };

  return (
    <div className="custom-container">
      <h2 onClick={handleMean}>{word}</h2>
      <div className="review-words-option">
        <img onClick={handleCheck} src={require("../../../img/Vocabulario/voc_check.png")} alt="" />
        <img onClick={handleProgress} src={require("../../../img/Vocabulario/voc_worlin.png")} alt="" />
        <img onClick={handleDesconocido} src={require("../../../img/Vocabulario/voc_x.png")} alt="" />
      </div>
    </div>
  );
};
