import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the available DSA topics and difficulty levels
const topics = ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs', 'Dynamic Programming'];
const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];

const DSA = () => {
    const [selectedTopic, setSelectedTopic] = useState('Arrays');
    const [selectedDifficulty, setSelectedDifficulty] = useState('Beginner');
    const navigate = useNavigate();

    // Handle topic change
    const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTopic(e.target.value);
    };

    // Handle difficulty change
    const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDifficulty(e.target.value);
    };

    // Navigate to CodeEditor on form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/code-editor', {
            state: { topic: selectedTopic, difficulty: selectedDifficulty },
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="w-full bg-gray-800 p-8 flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold text-blue-300 mb-4">DSA QUESTIONS</h1>
            </div>
            <div className="flex-grow p-8 flex flex-col">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-2xl font-bold mb-2" htmlFor="topic">Select a DSA Topic:</label>
                        <select
                            value={selectedTopic}
                            onChange={handleTopicChange}
                            className="w-full p-2 border rounded"
                        >
                            {topics.map((topic) => (
                                <option key={topic} value={topic}>{topic}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-2xl font-bold mb-2" htmlFor="difficulty">Select Difficulty Level:</label>
                        <select
                            value={selectedDifficulty}
                            onChange={handleDifficultyChange}
                            className="w-full p-2 border rounded"
                        >
                            {difficultyLevels.map((level) => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Generate Question
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DSA;