import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MdMic, MdMicOff, MdCallEnd, MdVideocam, MdVideocamOff, MdUploadFile } from 'react-icons/md';

// Check if SpeechRecognition is supported
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const Video = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [recognition, setRecognition] = useState(null);
    const [showVoiceUI, setShowVoiceUI] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [webcamActive, setWebcamActive] = useState(false);
    const [frames, setFrames] = useState([]); // Array to store frames

    useEffect(() => {
        if (SpeechRecognition) {
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = true;
            recognitionInstance.lang = 'en-US';
            recognitionInstance.interimResults = true;

            recognitionInstance.onresult = (event) => {
                const lastResult = event.results[event.results.length - 1];
                if (lastResult.isFinal) {
                    const finalTranscript = lastResult[0].transcript;
                    setTranscript(prevTranscript => prevTranscript + ' ' + finalTranscript);
                    handleVoiceResponse(finalTranscript);
                }
            };

            recognitionInstance.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
            };

            recognitionInstance.onend = () => {
                if (isListening && !isSpeaking) {
                    recognitionInstance.start();
                }
            };

            setRecognition(recognitionInstance);
        } else {
            console.warn('Speech recognition not supported in this browser.');
        }
    }, [isListening, isSpeaking]);

    useEffect(() => {
        console.log('webcamActive changed:', webcamActive); // Debugging
        if (webcamActive && videoRef.current) {
            navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    frameRate: { ideal: 30 }
                }
            })
            .then(stream => {
                videoRef.current.srcObject = stream;
                captureFrames(); // Start capturing frames
                console.log('Webcam stream started'); // Debugging
            })
            .catch(err => {
                console.error('Error accessing webcam:', err);
            });
        } else if (!webcamActive && videoRef.current) {
            // Stop capturing frames when webcam is turned off
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        }
    }, [webcamActive]);
    

    const handleFileChange = (event) => {
        setPdfFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!pdfFile) {
            alert('Please select a PDF file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('pdf', pdfFile);

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8000/Upload_Data', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { project1, project2 } = response.data;
            localStorage.setItem('project1', project1);
            localStorage.setItem('project2', project2);

            setLoading(false);
            setShowVoiceUI(true);
        } catch (error) {
            console.error('Error uploading PDF:', error);
            setLoading(false);
        }
    };

    const toggleListening = () => {
        if (isSpeaking) {
            console.log('Cannot start listening while AI is speaking.');
            return;
        }
        setIsListening(!isListening);
        if (!isListening) {
            recognition.start();
        } else {
            recognition.stop();
        }
    };

    const handleVoiceResponse = async (query) => {
        const project1 = localStorage.getItem('project1');
        const project2 = localStorage.getItem('project2');

        if (!project1 || !project2) {
            console.error('Project data not found in localStorage');
            return;
        }

        try {
            setIsSpeaking(true);
            setTranscript(''); // Clear transcript for new query
            const response = await axios.post('http://localhost:8000/Voice_Response', {
                query,
                domain: 'Machine Learning',
                number: '5',
                project1,
                project2
            });

            const voiceResponse = response.data.response;
            await speakText(voiceResponse);
            setIsSpeaking(false);

            if (isListening) {
                recognition.start();
            }
        } catch (error) {
            console.error('Error getting voice response:', error);
            setIsSpeaking(false);
        }
    };

    const speakText = (text) => {
        return new Promise((resolve) => {
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'en-US';

                if (recognition && isListening && !isSpeaking) {
                    recognition.stop();
                }

                utterance.onend = () => {
                    resolve();
                    if (isListening && !isSpeaking) {
                        recognition.start();
                    }
                };

                window.speechSynthesis.speak(utterance);
            } else {
                console.error('Speech synthesis not supported in this browser.');
                resolve();
            }
        });
    };

    const handleEndCall = async () => {
        setWebcamActive(false);

        try {
            const formData = new FormData();
            formData.append('frames', JSON.stringify(frames));

            const response = await axios.post('http://localhost:8000/Save_Frames', formData);
            setTranscript('');
            alert(response.data.message || 'Call ended and frames saved!');
            setShowVoiceUI(false);
            setIsListening(false);
            if (recognition) {
                recognition.stop();
            }
        } catch (error) {
            console.error('Error saving frames:', error);
        }
    };

    const captureFrames = () => {
        const interval = setInterval(() => {
            if (webcamActive && videoRef.current && canvasRef.current) {
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                const frame = canvas.toDataURL('image/png');
                console.log('frame')
                setFrames(prevFrames => [...prevFrames, frame]);
            }
        }, 100 / 30);

        return () => clearInterval(interval);
    };

    const toggleWebcam = () => {
        setWebcamActive(!webcamActive);
    };

    return (
        <div className="container mx-auto px-6 py-10">
            <div className="max-w-2xl mx-auto shadow-lg rounded-lg overflow-hidden bg-gray-800">
                <h1 className="text-4xl font-semibold text-center text-white p-8 bg-gradient-to-r from-indigo-600 to-purple-700">
                    Professional Video Call Interface
                </h1>

                {!showVoiceUI ? (
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="flex flex-col items-center">
                            <label className="flex items-center justify-center w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-500 rounded-lg shadow-sm cursor-pointer hover:bg-gray-600 transition duration-200 ease-in-out">
                                <MdUploadFile size={24} className="mr-2" />
                                <span>Choose PDF File</span>
                                <input 
                                    type="file" 
                                    accept="application/pdf" 
                                    onChange={handleFileChange} 
                                    className="hidden"
                                />
                            </label>
                        </div>
                        <div className="flex justify-center">
                            <button 
                                type="submit" 
                                className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:from-green-600 hover:to-teal-600 transition duration-200 ease-in-out transform hover:scale-105"
                            >
                                {loading ? 'Uploading...' : 'Upload PDF'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="bg-gray-700 p-8 rounded-b-lg space-y-6 text-white">
                        <h2 className="text-3xl font-semibold text-center">Video Call & Voice Assistant</h2>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={toggleListening}
                                disabled={isSpeaking}
                                className={`text-white font-bold p-4 rounded-full shadow-lg focus:outline-none ${
                                    isListening 
                                    ? 'bg-red-600 hover:bg-red-700' 
                                    : 'bg-green-600 hover:bg-green-700'
                                } ${isSpeaking ? 'opacity-50 cursor-not-allowed' : ''} transition duration-200 ease-in-out`}
                            >
                                {isListening ? <MdMicOff size={24} /> : <MdMic size={24} />}
                            </button>
                            <button
                                onClick={toggleWebcam}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-4 rounded-full shadow-lg focus:outline-none transition duration-200 ease-in-out"
                            >
                                {webcamActive ? <MdVideocamOff size={24} /> : <MdVideocam size={24} />}
                            </button>
                            <button
                                onClick={handleEndCall}
                                className="bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold p-4 rounded-full shadow-lg hover:from-red-700 hover:to-pink-700 transition duration-200 ease-in-out"
                            >
                                <MdCallEnd size={24} />
                            </button>
                        </div>
                        {transcript && (
                            <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-bold text-gray-300">Transcript:</h3>
                                <p className="text-gray-300 mt-2">{transcript}</p>
                            </div>
                        )}
                        {webcamActive && (
                            <div className="flex justify-center mt-6">
                                <video ref={videoRef} autoPlay className="rounded-lg shadow-lg" style={{ width: '100%', maxWidth: '500px', border: '2px solid #3b82f6' }} />
                            </div>
                        )}
                    </div>
                )}

                {loading && (
                    <div className="flex justify-center p-6">
                        <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Video;
