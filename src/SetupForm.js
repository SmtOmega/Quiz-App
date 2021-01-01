import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quizSetup, handleChange, handleSubmit, error } = useGlobalContext();
  return (
    <main>
      <form onSubmit={(e) => e.preventDefault()} className="setup-form">
        <div className="form-control">
          <label htmlFor="amount">Number of Questions</label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={quizSetup.amount}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-control">
          <label htmlFor="category">Select Category</label>
          <select
            name="category"
            id="category"
            value={quizSetup.category}
            onChange={handleChange}
            className="form-input"
          >
            <option value='sports'>sports</option>
            <option value='politics'>politics</option>
            <option value='history'>history</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="difficulty">Select Difficulty</label>
          <select
            name="difficulty"
            id="difficulty"
            value={quizSetup.difficulty}
            onChange={handleChange}
            className="form-input"
          >
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>
        {error ? <p>can't generate questions, please try different options</p> : null}
        <button onClick={handleSubmit} className="submit-btn btn">Start Quiz</button>
      </form>
    </main>
  );
};

export default SetupForm;
