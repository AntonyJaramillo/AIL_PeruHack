import { Word } from "../../../../components/word/Word";
import './WordLearned.css'
export const WordLearned = ({ mywords }) => {
  const wordsLearned = mywords.filter((word) => word.state === 1);
  return (
    <>
      <div className="word-learned-container">
        <h2>Words Learned</h2>
        <div>
          <div>
            {wordsLearned.map((word) => {
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
