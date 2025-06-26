import React, { useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_BASE_URL;
const AnswerQuestion = ({ question, index }) => {
  const [audioFile, setAudioFile] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState(null);

  const handleTranscribe = async () => {
    if (!audioFile) return;

    const formData = new FormData();
    formData.append("audio", audioFile);

    try {
        const { data } = await axios.post(`${API}/interview/transcribe`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // ✅ this must be outside "headers"
        });
      setTranscript(data.text);
    } catch (err) {
      console.error("Transcription failed:", err);
    }
  };

  const handleEvaluate = async () => {
      const sessionId = localStorage.getItem("interviewSessionId");
      
    try {
      const { data } = await axios.post(`${API}/interview/evaluate`, {
        sessionId,
        questionIndex: index,
        audio: transcript,
      });

      setFeedback(data.feedback);
    } catch (err) {
      console.error("Evaluation failed:", err);
    }
  };

  return (
    <div className="border p-4 rounded mb-6 bg-white">
      <p className="font-medium mb-2">
        Q{index + 1}: {question}
      </p>

      <input type="file" onChange={(e) => setAudioFile(e.target.files[0])} />
      <button
        onClick={handleTranscribe}
        className="mt-2 bg-gray-200 px-2 py-1 rounded"
      >
        Transcribe
      </button>

      {transcript && (
        <div className="mt-2">
          <p className="font-semibold">Transcript:</p>
          <p>{transcript}</p>
          <button
            onClick={handleEvaluate}
            className="mt-2 bg-green-500 text-white px-2 py-1 rounded"
          >
            Evaluate
          </button>
        </div>
      )}

      {feedback && (
        <div className="mt-3 text-sm">
          <p>
            <strong>Clarity:</strong> {feedback.clarity}
          </p>
          <p>
            <strong>Content Score:</strong> {feedback.contentScore}
          </p>
          <p>
            <strong>Keyword Match:</strong> {feedback.keywordMatch}
          </p>
          <p>
            <strong>Overall Score:</strong> {feedback.overallScore}
          </p>
        </div>
      )}
    </div>
  );
};

export default AnswerQuestion;
