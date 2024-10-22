import React, { useEffect, useState, useRef } from "react";

export default function ChatM() {
  const [prescription, setPrescription] = useState("hello");
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

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
    setIsLoading(true); // Set loading state to true
    const timestamp = new Date().toLocaleTimeString();
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
      setResponse(data.reply);
    } catch (error) {
      setResponse("Try again, unable to understand the query.");
    } finally {
      setIsLoading(false); // Reset loading state
      setInputValue("");
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputValue, sender: "You", time: timestamp },
        { text: response, sender: "PSA", time: timestamp },
      ]);
    }
  };

  const messagesEndRef = useRef(null); // Create a ref for the messages end

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to the bottom
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom whenever messages change
  }, [messages]);

  return (
    <div className="flex-1 justify-between flex flex-col w-full">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200 w-full fixed top-0 backdrop-blur-xl">
        <div className="text-2xl mt-1 flex items-center justify-center w-full">
          <span className="text-gray-700 mr-3">Personal Stress Analysis</span>
        </div>
      </div>

      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 w-full pt-20 pb-24"
      >
        {prescription && (
          <div className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg w-1/2 inline-block">
            {prescription}
          </div>
        )}
        {messages.map((msg, index) => {
          const isUser = msg.sender === "You";
          const messageClass = isUser ? "justify-end" : "";
          const messageBubbleClass = isUser
            ? "rounded-br-none bg-blue-600 text-white"
            : "bg-gray-300 text-gray-600";
          const messageAlignment = isUser ? "end" : "start";

          return (
            <div key={index} className={`chat-message w-full ${messageClass}`}>
              <div className="flex items-end w-full">
                <div className={`flex flex-col space-y-2 w-full mx-2 order-2 items-${messageAlignment}`}>
                  <div className={`w-1/2 flex justify-${messageAlignment}`}>
                    <span className={`px-3 py-3 rounded-lg inline-block ${messageBubbleClass}`}>
                      {msg.text}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} /> {/* Reference for scrolling */}
      </div>

      <div className="border-t-2 border-gray-200 px-4 p-4 mb-2 sm:mb-0 bottom-0 fixed w-full backdrop-blur-xl">
        <div className="relative flex gap-4">
          <input
            type="text"
            placeholder="Write your message!"
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
            onClick={handleSubmit}
            disabled={isLoading} // Disable button when loading
          >
            <span className="font-bold">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
