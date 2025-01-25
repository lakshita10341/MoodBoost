import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [displayedResponse, setDisplayedResponse] = useState<string>('');
  const [title, setTitle] = useState<string>(''); // State to hold the title
 
  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
   
      const res = await axios.post('https://mira-sdk-flask-server.onrender.com/analyze', {
        message: message,
      });
      setResponse(res.data);
      setError('');
      setDisplayedResponse(''); 

   
      const resultText = res.data.mira_response.result;
      const titleMatch = resultText.match(/Title: "(.*?)"/);
      if (titleMatch) {
        setTitle(titleMatch[1]); 
        const storyWithoutTitle = resultText.replace(/Title: "(.*?)"/, '').trim();
        setDisplayedResponse(storyWithoutTitle); // Update the response to only display the story
      }
    } catch (err) {
      setError('An error occurred while processing the message.');
      setResponse(null);
      setDisplayedResponse('');
    } finally {
      setLoading(false);
    }
  };

  // Typing effect for story response
  useEffect(() => {
    if (displayedResponse) {
      let idx = 0;
      const text = displayedResponse;
      const interval = setInterval(() => {
        setDisplayedResponse((prev) => prev + text[idx]);
        idx += 1;
        if (idx === text.length) {
          clearInterval(interval); // Stop when the text is fully displayed
        }
      }, 50); // Typing speed (in ms)
    }
  }, [displayedResponse]);

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
            <p className="text-lg">{displayedResponse}</p> 
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
