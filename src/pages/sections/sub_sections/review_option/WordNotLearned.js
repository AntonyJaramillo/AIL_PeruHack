import { Word } from "../../../../components/word/Word";
import './WordLearned.css'
export const WordNotLearned = ({ mywords }) => {
  const wordsNotLearned = mywords.filter((word) => word.state === -1);
  return (
    <>
      <div className="word-not-learned-container">
        <h2>Words Not Learned</h2>
        <div>
          <div>
            {wordsNotLearned.map((word) => {
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
