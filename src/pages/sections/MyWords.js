import { Header } from "../../components/Header";
import "./css/MyWords.css";

import { MyVocabulary } from "./sub_sections/MyVocabulary";
import { Review } from "./sub_sections/Review";
import { useState } from "react";
import { BtnBack } from "../../components/button/BtnBack";

import { ModalAdd } from "../../components/Modal/ModalAdd";
import { ModalInfo } from "../../components/Modal/ModalInfo";

import { useEffect } from "react";
import { getWords } from "../../firebase-crud";
import { BtnWord } from "../../components/button/BtnWord";
import { WordTobeLearned } from "./sub_sections/review_option/WordTobeLearned";
import { WordLearned } from "./sub_sections/review_option/WordLearned";
import { WordNotLearned } from "./sub_sections/review_option/WordNotLearned";

export const MyWords = () => {
  const [option1, setOption1] = useState(true);
  const [option2, setOption2] = useState(true);

  const hadleOption1 = () => {
    setOption1(false);
  };

  const hadleOption2 = () => {
    setOption2(false);
  };

  const handleBack = () => {
    setOption1(true);
    setOption2(true);
  };
  //Obtencion de la lista de palabras:
  const [mywords, setMyWords] = useState([]);
  const getWordList = async () => {
    const data = await getWords();
    setMyWords(
      data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  };

  useEffect(() => {
    getWordList();
  }, [mywords]);

  //?Review Words Option:
  const [wordOption, setWordOption] = useState(false);
  const [wordOption2, setWordOption2] = useState(false);
  const [wordOption3, setWordOption3] = useState(false);
  const handleWordOption = () => {
    setWordOption(true);
  };
  const handleWordOption2 = () => {
    setWordOption2(true);
  };
  const handleWordOption3 = () => {
    setWordOption3(true);
  };
  const handleBackReview = () => {
    setWordOption(false);
    setWordOption2(false);
    setWordOption3(false);
  };

  return (
    <div className="words-section">
      {option1 && option2 && <Header text="My words" />}
      {!option1 && option2 && <Header text="My vocabulary" imgURL={require("../../img/languages.png")} />}
      {!option2 && option1 && <Header text="It's time to review" imgURL={require("../../img/its_time_to_review.png")} />}
      <div className="words-content">
        <div className="study-option">
          {!option2 ||
            (option1 && (
              <div className="vocabulary-option" onClick={hadleOption1}>
                <h2>My vocabulary</h2>
                <img src={require("../../img/vocabulary.png")} alt="" />
              </div>
            )) || (
              <div className="vocabulary-open">
                <div className="modal-add-position">
                  <ModalAdd />
                </div>

                <MyVocabulary ListWords={mywords} />
                <div onClick={handleBack} className="btn-back-container">
                  <BtnBack />
                </div>
              </div>
            )}

          {!option1 ||
            (option2 && (
              <div className="review-option" onClick={hadleOption2}>
                <h2>It's time to review</h2>
                <img src={require("../../img/review.png")} alt="" />
              </div>
            )) || (
              <div className="review-open">
                {(!wordOption&&!wordOption2&&!wordOption3) && (
                  <>
                    <div className="carousel-btns-container">
                      <div className="carousel-info-contaner">
                        <div className="probando-xd">
                          <Review ListWords={mywords} />
                          <div className="info-container">
                            <ModalInfo />
                          </div>
                        </div>
                      </div>
                      <div className="btns-container-options">
                        {/* <h2>Words</h2> */}
                        <div
                          className="btn-option-learned btn-option-selected"
                          onClick={handleWordOption}
                        >
                          <BtnWord
                            text="Learned"
                            color={{ h: 216, s: 18, l: 16 }}
                          />
                        </div>

                        <div className="btn-option-learned btn-option-selected"
                        onClick={handleWordOption2}
                        >
                          <BtnWord
                            text="To be Learned"
                            color={{ h: 216, s: 18, l: 16 }}
                          />
                        </div>

                        <div className="btn-option-learned btn-option-selected"
                        onClick={handleWordOption3}
                        >
                          <BtnWord
                            text="Not Learned"
                            color={{ h: 216, s: 18, l: 16 }}
                          />
                        </div>
                      </div>
                    </div>

                    <p className="review-open-description">"Education is the key to success" <span><img src={require("../../img/trofeo.png")} alt="" /></span></p>
                    <div onClick={handleBack} className="btn-back-container">
                      <BtnBack />
                    </div>
                  </>
                )}

                {wordOption && (
                  <>
                    <WordLearned mywords={mywords} />
                    <div onClick={handleBackReview} className="btn-back-wordLearned">
                      <BtnBack />
                    </div>
                  </>
                )}

                {wordOption2 && (
                  <>
                    <WordTobeLearned mywords={mywords} />
                    <div onClick={handleBackReview} className="btn-back-wordLearned">
                      <BtnBack />
                    </div>
                  </>
                )}

                {wordOption3 && (
                  <>
                    <WordNotLearned mywords={mywords}/>
                    <div onClick={handleBackReview} className="btn-back-wordLearned">
                      <BtnBack />
                    </div>
                  </>
                )}

                {/* <WordTobeLearned mywords={mywords}/>
                <WordNotLearned mywords={mywords}/> */}
              </div>
            )}
        </div>
        {option1 && option2 && <p className="my-words-description">"The future depends on what you do today"<span><img src={require("../../img/trofeo.png")} alt="" /></span></p>}
      </div>
    </div>
  );
};
