// import React, { useState, useEffect, useRef } from 'react';

// declare global {
//   interface Window {
//     SpeechRecognition: any;
//     webkitSpeechRecognition: any;
//   }
// }

// const GroupDiscussion: React.FC = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [discussionId, setDiscussionId] = useState('');
//   const [topic, setTopic] = useState('');
//   const [conversation, setConversation] = useState<string[]>([]);
//   const [currentSpeaker, setCurrentSpeaker] = useState('');
//   const recognitionRef = useRef<any>(null);
//   const synthRef = useRef<SpeechSynthesis | null>(null);

//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     recognitionRef.current = new SpeechRecognition();
//     recognitionRef.current.continuous = true;
//     recognitionRef.current.interimResults = true;

//     recognitionRef.current.onresult = (event: any) => {
//       const transcript = Array.from(event.results)
//         .map((result: any) => result[0])
//         .map((result) => result.transcript)
//         .join('');

//       if (event.results[0].isFinal) {
//         handleUserInput(transcript);
//       }
//     };

//     synthRef.current = window.speechSynthesis;

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//       if (synthRef.current) {
//         synthRef.current.cancel();
//       }
//     };
//   }, []);

//   const startListening = () => {
//     setIsListening(true);
//     recognitionRef.current.start();
//   };

//   const stopListening = () => {
//     setIsListening(false);
//     recognitionRef.current.stop();
//   };

//   const handleUserInput = async (input: string) => {
//     setConversation((prev) => [...prev, `You: ${input}`]);

//     try {
//       const response = await fetch('http://localhost:8000/continue_discussion', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ discussion_id: discussionId, user_input: input }),
//       });
//       const data = await response.json();
//       setConversation(data.conversation);

//       // Speak each agent's response
//       data.agents.forEach((agent: any) => {
//         setCurrentSpeaker(agent.name);
//         speakText(`${agent.name} says: ${agent.response}`);
//       });
//     } catch (error) {
//       console.error('Error continuing discussion:', error);
//     }
//   };

//   const speakText = (text: string) => {
//     if (synthRef.current) {
//       const utterance = new SpeechSynthesisUtterance(text);
//       synthRef.current.speak(utterance);
//     }
//   };

//   const startDiscussion = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/start_discussion', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ discussion_id: Date.now().toString(), topic }),
//       });
//       const data = await response.json();
//       setDiscussionId(data.discussion_id);
//       setConversation(data.conversation);

//       // Speak the initial responses
//       data.agents.forEach((agent: any) => {
//         setCurrentSpeaker(agent.name);
//         speakText(`${agent.name} says: ${agent.response}`);
//       });
//     } catch (error) {
//       console.error('Error starting discussion:', error);
//     }
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-bold mb-4">Voice-Enabled Group Discussion</h2>
//         {!discussionId ? (
//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Enter discussion topic"
//               value={topic}
//               onChange={(e) => setTopic(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               onClick={startDiscussion}
//               disabled={!topic}
//               className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Start Discussion
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <div className="h-96 overflow-y-auto border border-gray-300 rounded-md p-4">
//               {conversation.map((message, index) => (
//                 <div key={index} className="mb-2">
//                   {message}
//                 </div>
//               ))}
//               {currentSpeaker && <div className="font-bold">Currently speaking: {currentSpeaker}</div>}
//             </div>
//             <div className="flex justify-center">
//               <button
//                 onClick={isListening ? stopListening : startListening}
//                 className={`py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
//                   isListening
//                     ? 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'
//                     : 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500'
//                 }`}
//               >
//                 {isListening ? 'Stop Listening' : 'Start Listening'}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GroupDiscussion;
import React, { useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const GroupDiscussion: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [discussionId, setDiscussionId] = useState('');
  const [topic, setTopic] = useState('');
  const [conversation, setConversation] = useState<string[]>([]);
  const [currentSpeaker, setCurrentSpeaker] = useState('');
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const [analysis, setAnalysis] = useState('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');

      if (event.results[0].isFinal) {
        handleUserInput(transcript);
      }
    };

    synthRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const startListening = () => {
    setIsListening(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognitionRef.current.stop();
  };

  const handleUserInput = async (input: string) => {
    setConversation((prev) => [...prev, `You: ${input}`]);

    try {
      const response = await fetch('http://localhost:8000/continue_discussion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discussion_id: discussionId, user_input: input }),
      });
      const data = await response.json();
      setConversation(data.conversation);

      // Speak each agent's response
      data.agents.forEach((agent: any) => {
        setCurrentSpeaker(agent.name);
        speakText(`${agent.name} says: ${agent.response}`);
      });
    } catch (error) {
      console.error('Error continuing discussion:', error);
    }
  };

  const speakText = (text: string) => {
    if (synthRef.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      synthRef.current.speak(utterance);
    }
  };

  const startDiscussion = async () => {
    try {
      const response = await fetch('http://localhost:8000/start_discussion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discussion_id: Date.now().toString(), topic }),
      });
      const data = await response.json();
      setDiscussionId(data.discussion_id);
      setConversation(data.conversation);

      // Speak the initial responses
      data.agents.forEach((agent: any) => {
        setCurrentSpeaker(agent.name);
        speakText(`${agent.name} says: ${agent.response}`);
      });
    } catch (error) {
      console.error('Error starting discussion:', error);
    }
  };
  const endDiscussion = async () => {
    try {
      const response = await fetch('http://localhost:8000/end_discussion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discussion_id: discussionId, conversation }),
      });
      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error('Error ending discussion:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-xl p-10">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-600">🎤 Group Discussion Assistant</h2>
        {!discussionId ? (
          <div className="space-y-8">
            <input
              type="text"
              placeholder="Enter a topic for discussion..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-400"
            />
            <button
              onClick={startDiscussion}
              disabled={!topic}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
            >
              Start Discussion
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="h-80 overflow-y-auto border border-gray-200 rounded-md p-4 bg-gray-50 shadow-inner">
              {conversation.map((message, index) => (
                <div key={index} className="mb-3">
                  <span className="block text-gray-800">{message}</span>
                </div>
              ))}
              {currentSpeaker && (
                <div className="mt-4 font-semibold text-blue-600">
                  Currently speaking: {currentSpeaker}
                </div>
              )}
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`py-3 px-6 rounded-md shadow-md focus:outline-none focus:ring-4 transition duration-300 ${
                  isListening
                    ? 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400'
                    : 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400'
                }`}
              >
                {isListening ? 'Stop Listening' : 'Start Listening'}
              </button>
              <button
                onClick={startDiscussion}
                className="py-3 px-6 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300"
              >
                Restart Discussion
              </button>
              <button
                onClick={endDiscussion}
                className="py-3 px-6 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition duration-300"
              >
                End Discussion
              </button>
            </div>
            {analysis && (
              <div className="mt-6 p-6 bg-gray-100 border border-gray-300 rounded-md shadow">
                <h3 className="text-xl font-semibold mb-3">📝 Discussion Analysis:</h3>
                <p className="text-gray-700">{analysis}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDiscussion;
