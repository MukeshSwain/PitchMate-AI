import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API = import .meta.env.VITE_API_BASE_URL;

const MockInterviewForm = () => {
  const [resume, setResume] = useState(null);
  const [difficulty, setDifficulty] = useState("medium");
  const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

  const handleGenerate = async () => {
    if (!resume) return alert("Upload your resume");

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("difficultyLevel", difficulty);
    formData.append("numQuestions", 5);

    setLoading(true);
    try {
        const { data } = await axios.post(`${API}/interview/questions`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setQuestions(data.questions || []);
        localStorage.setItem("interviewSessionId", data.data._id);
        navigate("/inter")
    } catch (err) {
      console.error(err);
      alert("Failed to generate questions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Start Mock Interview</h2>

      <input type="file" onChange={(e) => setResume(e.target.files[0])} />
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="mt-2 block"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button
        onClick={handleGenerate}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Generating..." : "Generate Questions"}
      </button>

      {questions.length > 0 && (
        <ul className="mt-6 space-y-2">
          {questions.map((q, idx) => (
            <li key={idx} className="border p-2 rounded bg-gray-50">
              {q}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MockInterviewForm;
