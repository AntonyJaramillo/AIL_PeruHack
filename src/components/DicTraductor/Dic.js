import { useState } from "react";
import axios from "axios";
import {addWord} from '../../firebase-crud';
import "./Dic.css";

export const Dic = () => {
  const [inputText, setInputText] = useState("");
  const [definition, setDefinition] = useState("");
  const [definitionState, setDefinitionState] = useState(false)
  //   const [translatedResult, setTranslatedResult] = useState('');

  //!Agregado
  const [translate, setTranslate] = useState("");
  const [translateState, setTranslateState] = useState(false)

  const handleDefinition = () => {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputText}`) // documentacion:https://dictionaryapi.dev/
      .then((response) => {
        setDefinition(response.data[0].meanings[0].definitions[0].definition);
      })
      .catch((error) => {
        console.error(error);
      });
      setDefinitionState(true);
      setTranslateState(false);
  };

  const handleTranslate = () =>{
    //! Agregado
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", inputText); 
    encodedParams.append("target", "es");
    encodedParams.append("source", "en");

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": "b0ad4de475msh6c1e800e7bb5723p102758jsn7163263019a4",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
      body: encodedParams,
    };

    fetch(
      "https://google-translate1.p.rapidapi.com/language/translate/v2",
      options
    )
      .then((response) => response.json())
      .then((resp) => {
        console.log({ resp });
        let wordTranslated = resp.data.translations[0].translatedText;
        setTranslate(wordTranslated);
      })
      .catch((err) => console.error(err));
      setDefinitionState(false);
      setTranslateState(true);
  }

  const handleAddWord = async (e) => {
    e.preventDefault();
    await addWord({
      word: inputText,
      mean: translate,
      state: 2,
    });
  };

  return (
    <div className="dic-container">
      <h2>
        <span>
          <img src={require("../../img/read_flag.png")} alt="" />
        </span>
        Coloca la palabra que quieres consultar aquí:
      </h2>

      {/* <input
          type="text"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          placeholder="Write here ..."
        />
        <button onClick={handleDefinition} class="button-search">
            
            <span className="button-content-search">Search</span>
        </button>
        <span className='result-dic'>{definition}</span> */}

      <input
        type="text"
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
        placeholder="Write here ..."
      />
      <div className="btns-definition-translate">
        <button onClick={handleDefinition} className="button-search">
          <span className="button-content-search">Definition</span>
        </button>
        <button onClick={handleTranslate} className="button-search">
          <span className="button-content-search">Spanish</span>
        </button>
      </div>

      <span className="result-dic">{((definitionState) && definition)|| translate}</span>

      {(translateState)&&(<div className="add-to-my-words"><span>Add to 'My Words'</span><span><img src={require("../../img/plus.png")} alt="" onClick={handleAddWord}/></span></div>)}

      {/* <button onClick={handleTranslate}>Traducir a español</button> */}
      {/* <p>{translatedResult}</p> */}
    </div>
  );
};
