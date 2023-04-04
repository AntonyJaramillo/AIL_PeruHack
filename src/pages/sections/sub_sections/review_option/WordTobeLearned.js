import { Word } from "../../../../components/word/Word";
import './WordLearned.css'
export const WordTobeLearned = ({ mywords }) => {
  const wordsTobeLearned = mywords.filter((word) => word.state === 0);
  return (
    <>
      <div className="word-tobe-learned-container">
        <h2>Words To be Learned</h2>
        <div>
          <div>
            {wordsTobeLearned.map((word) => {
              return (
                <div key={word.id}>
                  <Word word={word.word} mean={word.mean} wordID={word.id} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
