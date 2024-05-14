import axios from "axios";
import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [userInput, setUserInput] = useState("");
  const httpClient = axios.create({
    baseURL: "http://localhost:3000/",
  });

  const requestUser = async () => {
    const json = {
      contentMessage: userInput,
    };
    const response = await httpClient.post("askGroq", json, {
      headers: {
        "Content-Type": "application/json",
        Accept: "aapplication/json",
      },
    });

    setMessage(response.data.message.content);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <label htmlFor="groqInput" className="block mb-2">
        Ask Groq
      </label>
      <input
        id="groqInput"
        type="text"
        value={userInput}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={requestUser}
        className="w-full p-2 bg-teal-500 text-white rounded"
      >
        Ask Groq
      </button>
      <p className="mt-4">{message}</p>
    </div>
  );
}

export default App;
