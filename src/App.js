import SetupForm from "./SetupForm";
import { useGlobalContext } from "./context";
import Modal from './Modal'
import Loading from './Loading'
import "./App.css";

function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    numCorrect,
    nextQuestion,
    checkAnswer
  } = useGlobalContext();
  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <main>
        <Loading />
    </main>;
  }

  const { question, correct_answer, incorrect_answers } = questions[index];
  const tempValue = Math.floor(Math.random() * 4)
  const answers = [...incorrect_answers];
  if(tempValue === 3){
    answers.push(correct_answer)
  }else{
    answers.push(answers[tempValue])
    answers[tempValue] = correct_answer
  }
  console.log(answers)
  return (
    <main>
      <Modal />
      <section className="quiz-card">
        <p className="num-correct">
          number of Correct Ans: {numCorrect}/{index}
        </p>
        <article>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  dangerouslySetInnerHTML={{ __html: answer }}
                  key={index}
                  onClick={()=> checkAnswer(answer === correct_answer)}
                  className="btn"
                />
              );
            })}
          </div>
        </article>
        <div className="next-btn-container">
          <button onClick={() => nextQuestion()} className="nxt-btn">Next Question</button>
        </div>
        
      </section>
    </main>
  );
}

export default App;
