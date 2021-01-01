import { useGlobalContext } from "./context";

const Modal = () => {
  const { isModalOpen, questions, numCorrect, closeModal } = useGlobalContext();
  return (
    <div className={isModalOpen ? "modal-container openModal" : "modal-container"}>
      <div className="modal-content">
        <h2>Congrats You have Completed the Quiz</h2>
        <p>you scored {((numCorrect / questions.length) * 100).toFixed(0)}%</p>
        <button onClick={closeModal} className="btn">Play again</button>
      </div>
    </div>
  );
};

export default Modal;
