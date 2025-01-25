import React, { useState, useEffect } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [displayedResponse, setDisplayedResponse] = useState<string>("");
  const [title, setTitle] = useState<string>(""); // State to hold the title
  const [completeStory, setCompleteStory] = useState<string>(""); // Store the complete story

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const fakeResponse = {
    sentiment_score: { compound: 0.8421 },
    mira_response: {
      result: `Title: "The Ripple Effect of Enthusiasm"

      AAs you step into your office, the energy in the air feels different. It’s a Monday, but instead of the usual grogginess, you’re brimming with excitement. A new project had been announced last Friday, and over the weekend, you couldn’t help but imagine its potential. Your mind raced with ideas, and now you’re ready to bring that energy into the workplace.

      Your colleague Sarah, stationed at the desk beside yours, notices your beaming smile before you’ve even set down your coffee. "What’s got you so energized this early?" she asks, her tone half-teasing but laced with curiosity.

      You take a deep breath and dive in, sharing your optimism about the project. You paint a vivid picture of its possibilities—how it could streamline processes, improve customer satisfaction, and even open doors to new market opportunities. Sarah listens intently, her eyes lighting up as your enthusiasm takes hold.

      Soon, what started as a spark of positivity grows into a team-wide movement. A ripple effect of creativity and progress spreads across your office.

      And just like that, a single moment of enthusiasm turned into a day of breakthroughs and new possibilities.`,
    },
  };

  const handleSubmit = async () => {
    setLoading(true);
    setDisplayedResponse(""); // Reset displayed response
    setCompleteStory(""); // Reset complete story

    try {
      // Simulating API call
      setTimeout(() => {
        setResponse(fakeResponse);
        setError("");

        const resultText = fakeResponse.mira_response.result;
        const titleMatch = resultText.match(/Title: "(.*?)"/);
        if (titleMatch) {
          setTitle(titleMatch[1]); // Extract and set the title
        }
        const storyWithoutTitle = resultText.replace(/Title: "(.*?)"/, "").trim();
        setCompleteStory(storyWithoutTitle); // Store the full story for typing effect
        setLoading(false);
      }, 2000);
    } catch (err) {
      setError("An error occurred while processing the message.");
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  // Typing effect for the story response
  useEffect(() => {
    if (completeStory) {
      let idx = 0;
      const interval = setInterval(() => {
        setDisplayedResponse((prev) => prev + completeStory[idx]);
        idx += 1;
        if (idx === completeStory.length) {
          clearInterval(interval); // Stop the interval when the full text is displayed
        }
      }, 50); // Typing speed (in ms)

      return () => clearInterval(interval); // Cleanup the interval on component unmount
    }
  }, [completeStory]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white p-8">
      <h1 className="text-6xl font-extrabold text-center mb-4 text-indigo-600">
        MoodHack - Sentiment Analysis
      </h1>

      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Enter your message..."
        className="p-3 mb-4 w-1/2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-white"
      />

      <button
        onClick={handleSubmit}
        className="bg-indigo-600 py-2 px-6 rounded-md text-white font-semibold hover:bg-indigo-700 transition-all duration-300"
      >
        Submit
      </button>

      {loading && (
        <div className="mt-4 text-yellow-400 animate-pulse">Loading... Please wait...</div>
      )}

      {error && <div className="mt-4 text-red-500">{error}</div>}

      {response && (
        <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl">
          <h3 className="text-2xl font-semibold mb-4">Here is your Sentiment Score:</h3>
          <div className="mb-4">
            <strong className="text-lg">Sentiment Score:</strong>
            <p className="text-lg">{response.sentiment_score.compound}</p>
          </div>

          <div className="mb-4">
            {title && <p className="font-bold text-xl mb-4">{title}</p>}
            <p className="text-lg">{displayedResponse}</p> {/* Display the typing effect */}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
