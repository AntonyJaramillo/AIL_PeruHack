import "./MyVocabulary.css";
import { Word } from "../../../components/word/Word";

export const MyVocabulary = ({ListWords}) => {
  return (
    <div className="myVocabulary-container">
      <div className="my-vocabulary-words-container">
      {ListWords.map((word) => {
        return (
          <div key={word.id}>
            <Word word={word.word} mean={word.mean} wordID={word.id} />
          </div>
        );
      })}
      </div> 
    </div>
  );
};
