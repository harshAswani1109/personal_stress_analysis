import React, { useEffect, useState } from "react";

export default function ChatM() {
  const [prescription, setPrescription] = useState("hello");
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  const [messages, setMessages] = useState([]); // Change to store an array of messages

  useEffect(() => {
    const storedPrescription = localStorage.getItem("prescription");
    if (storedPrescription) {
      setPrescription(JSON.parse(storedPrescription));
    }
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleTimeString(); // Get current time
    try {
      const res = await fetch("/api/msg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      setResponse(data.reply); // Assuming the response has a 'reply' field
    } catch (error) {
      setResponse("Try again, unable to understand the query."); // Set error message
    } finally {
      setInputValue(""); // Clear input after submission
      // Store both user message and timestamp
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputValue, sender: "You", time: timestamp },
        { text: response, sender: "PSA", time: timestamp }, // Add response message
      ]);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 h-screen">
      {prescription && (
        <div className="mt-4 p-2 border border-gray-300 rounded bg-white shadow">
          {prescription} {/* Display the prescription as the first message */}
        </div>
      )}
      {prescription ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md flex">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-l w-full"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-r"
          >
            Send
          </button>
        </form>
      ) : (
        <p className="text-red-500">No prescription available</p>
      )}

      {/* Display all messages */}
      {messages.map((msg, index) => (
        <div
          key={index}
          className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
        >
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {msg.sender}
            </span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {msg.time}
            </span>
          </div>
          <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
            {msg.text}
          </p>
        </div>
      ))}
    </div>
  );
}
