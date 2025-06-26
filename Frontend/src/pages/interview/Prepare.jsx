import React, { useEffect, useState } from "react";
import AnswerQuestion from "./AnswerQuestions";
import axios from "axios";
const API = import .meta.env.VITE_API_BASE_URL;

const MockInterviewSession = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
        const sessionId = localStorage.getItem("interviewSessionId");
        
        
        const { data } = await axios.get(`${API}/interview/session/${sessionId}`);
        console.log(data);
        
      setQuestions(data.questions);
    };

    fetchQuestions();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Your Interview Questions</h2>
      {questions?.map((q, idx) => (
        <AnswerQuestion key={idx} question={q} index={idx} />
      ))}
    </div>
  );
};

export default MockInterviewSession;
