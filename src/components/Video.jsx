import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Check if SpeechRecognition is supported
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

const Video = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [recognition, setRecognition] = useState(null);
    const [showVoiceUI, setShowVoiceUI] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const videoRef = useRef(null);
    const [webcamActive, setWebcamActive] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);

    useEffect(() => {
        console.log('Initializing SpeechRecognition...');
        if (SpeechRecognition) {
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = true;
            recognitionInstance.lang = 'en-US';
            recognitionInstance.interimResults = true;

            recognitionInstance.onresult = (event) => {
                const lastResult = event.results[event.results.length - 1];
                console.log('SpeechRecognition result:', lastResult);
                if (lastResult.isFinal) {
                    const finalTranscript = lastResult[0].transcript;
                    setTranscript(prevTranscript => prevTranscript + ' ' + finalTranscript);
                    console.log('Final transcript:', finalTranscript);
                    handleVoiceResponse(finalTranscript);
                }
            };

            recognitionInstance.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
            };

            recognitionInstance.onend = () => {
                console.log('SpeechRecognition ended.');
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
        console.log('Webcam Active:', webcamActive);
        if (webcamActive && videoRef.current) {
            navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    frameRate: { ideal: 30 }
                }
            })
            .then(stream => {
                console.log('Webcam stream started.');
                videoRef.current.srcObject = stream;

                const recorder = new MediaRecorder(stream, {
                    mimeType: 'video/webm; codecs=vp8',
                    videoBitsPerSecond: 2500000,
                });
                recorder.ondataavailable = handleDataAvailable;
                setMediaRecorder(recorder);
                
                recorder.start(1000); // Collect data every second
                console.log('MediaRecorder started');
            })
            .catch(err => {
                console.error('Error accessing webcam:', err);
            });
        } else if (!webcamActive && mediaRecorder) {
            mediaRecorder.stop();
            console.log('MediaRecorder stopped');
        }
    }, [webcamActive]);

    const handleDataAvailable = (event) => {
        console.log('Data available from MediaRecorder:', event);
        if (event.data && event.data.size > 0) {
            setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
        }
    };

    const handleFileChange = (event) => {
        console.log('File selected:', event.target.files[0]);
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
            console.log('Uploading PDF...');
            setLoading(true);
            const response = await axios.post('http://localhost:8000/Upload_Data', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Upload response:', response.data);
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
        console.log('Toggling listening state:', !isListening);
        setIsListening(!isListening);
        if (!isListening) {
            recognition.start();
            console.log('Started listening...');
        } else {
            recognition.stop();
            console.log('Stopped listening.');
        }
    };

    const handleVoiceResponse = async (query) => {
        const project1 = localStorage.getItem('project1');
        const project2 = localStorage.getItem('project2');

        console.log('Fetching voice response for query:', query);
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

            console.log('Voice response from API:', response.data);
            const voiceResponse = response.data.response;
            
            await speakText(voiceResponse);
            setIsSpeaking(false);

            // Restart listening after speaking
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
    
                // Pause recognition before speaking
                if (recognition && isListening && !isSpeaking) {
                    recognition.stop();
                    console.log('Stopped recognition before speaking');
                }
    
                utterance.onend = () => {
                    console.log('Finished speaking');
                    resolve();
                    
                    // Restart recognition if still listening
                    if (isListening && !isSpeaking) {
                        recognition.start();
                        console.log('Restarted recognition after speaking');
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
        console.log('Ending call...');
        if (mediaRecorder) {
            mediaRecorder.stop();
        }

        try {
            const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
        const formData = new FormData();
        formData.append('video', videoBlob, 'recordedVideo.webm'); // Use videoBlob here
        


            console.log('Saving video...');
            const response = await axios.post('http://localhost:8000/Save_Video', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Save video response:', response.data);
            setTranscript('');
            alert(response.data.message || 'Call ended and video saved!');
            setShowVoiceUI(false);
            setIsListening(false);
            if (recognition) {
                recognition.stop();
            }
        } catch (error) {
            console.error('Error saving video:', error);
        }
    };

    const toggleWebcam = () => {
        console.log('Toggling webcam:', !webcamActive);
        setWebcamActive(!webcamActive);
        if (mediaRecorder && webcamActive) {
            mediaRecorder.stop();
        } else if (mediaRecorder && !webcamActive) {
            mediaRecorder.start(1000);
        }
    };

    return (
        <div className="container mx-auto px-6 py-10">
            <div className="max-w-2xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white">
                <h1 className="text-4xl font-semibold text-center text-gray-800 p-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    Document Upload & Voice Call Assistant
                </h1>

                {!showVoiceUI ? (
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="flex flex-col items-center">
                            <input 
                                type="file" 
                                accept="application/pdf" 
                                onChange={handleFileChange} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-400"
                            />
                        </div>
                        <div className="flex justify-center">
                            <button 
                                type="submit" 
                                className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:from-green-500 hover:to-blue-600 transition-transform transform hover:scale-105"
                            >
                                {loading ? 'Uploading...' : 'Upload PDF'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="bg-gray-50 p-8 rounded-b-lg space-y-6">
                        <h2 className="text-3xl font-semibold text-center text-gray-700">Voice Call & Webcam</h2>
                        <div className="flex justify-center">
                            <button
                                onClick={toggleListening}
                                disabled={isSpeaking}
                                className={`text-white font-bold px-8 py-3 rounded-lg shadow-lg focus:outline-none ${
                                    isListening 
                                    ? 'bg-red-500 hover:bg-red-600' 
                                    : 'bg-green-500 hover:bg-green-600'
                                } ${isSpeaking ? 'opacity-50 cursor-not-allowed' : ''} transition-transform transform hover:scale-105`}
                            >
                                {isListening ? 'Stop Listening' : 'Start Listening'}
                            </button>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleEndCall}
                                className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:from-red-600 hover:to-pink-600 transition-transform transform hover:scale-105"
                            >
                                End Call
                            </button>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={toggleWebcam}
                                className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-green-600 transition-transform transform hover:scale-105"
                            >
                                {webcamActive ? 'Stop Webcam' : 'Start Webcam'}
                            </button>
                        </div>
                        {transcript && (
                            <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-bold text-gray-700">Transcript:</h3>
                                <p className="text-gray-600 mt-2">{transcript}</p>
                            </div>
                        )}
                        {webcamActive && (
                            <div className="flex justify-center mt-6">
                                <video ref={videoRef} autoPlay className="rounded-lg shadow-lg" style={{ width: '100%', maxWidth: '500px' }} />
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
