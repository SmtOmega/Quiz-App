import React, { useContext, useState } from "react";
import axios from "axios";

const table = {
  sports: 21,
  politics: 24,
  history: 23,
};
const API_END_POINT = "https://opentdb.com/api.php?";

const AppContext = React.createContext();

let url = "";

export const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [numCorrect, setNumCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [quizSetup, setQuizSetup] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);
    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };

  const checkAnswer = (value) => {
    if (value) {
      setNumCorrect((oldstate) => {
        return oldstate + 1;
      });
    }
      nextQuestion();
  };

  const nextQuestion = () => {
    setIndex((oldstate) => {
      const newIndex = oldstate + 1;
      if (newIndex > questions.length - 1) {
        openModal();
        return 0;
      }
      return newIndex;
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setWaiting(true);
    setNumCorrect(0);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuizSetup({ ...quizSetup, [name]: value });
  };
  const handleSubmit = () => {
    url = `${API_END_POINT}amount=${quizSetup.amount}&category=${
      table[quizSetup.category]
    }&difficulty=${quizSetup.difficulty}&type=multiple`;

    fetchQuestions(url);
  };
  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        numCorrect,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        quizSetup,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
