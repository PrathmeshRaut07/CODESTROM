import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Editor from '@monaco-editor/react';

const CodeEditor = () => {
    const location = useLocation();
    const { topic, difficulty } = location.state || {};
    const [question, setQuestion] = useState('');
    const [solution, setSolution] = useState('');
    const [userCode, setUserCode] = useState('');
    const [output, setOutput] = useState('');
    const [evaluation, setEvaluation] = useState('');
    const [loading, setLoading] = useState(false);
    const [solutionGenerated, setSolutionGenerated] = useState(false);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await fetch('http://localhost:5004/generate_question', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ topic, difficulty }),
                });

                const data = await response.json();
                setQuestion(data.question);
            } catch (error) {
                console.error('Error fetching question:', error);
            }
        };

        if (topic && difficulty) {
            fetchQuestion();
        }
    }, [topic, difficulty]);

    const handleCodeRun = async (e) => {
        e.preventDefault();
        setLoading(true);
        setOutput('');
        setEvaluation('');

        try {
            const response = await fetch('http://localhost:5004/run_code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: userCode }),
            });

            const result = await response.json();
            setOutput(result.output);

            if (result.output.startsWith('Compilation Error:')) {
                return; // Exit early if there's a compilation error
            }

            if (!solutionGenerated) {
                const solutionResponse = await fetch('http://localhost:5004/generate_dsa_question_solution', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ question }),
                });

                const solutionData = await solutionResponse.json();
                setSolution(solutionData.solution || 'No solution generated.');
                setSolutionGenerated(true);
            }
        } catch (error) {
            console.error('Error running code:', error);
            setOutput('Error executing code');
        } finally {
            setLoading(false);
        }
    };

    const handleEvaluateCode = async () => {
        setLoading(true);
        setEvaluation('');

        try {
            const response = await fetch('http://localhost:5004/evaluate_code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: userCode, question }),
            });

            const data = await response.json();
            const cleanEvaluation = data.evaluation.replace(/<\/?[^>]+(>|$)/g, "");
            setEvaluation(cleanEvaluation);
        } catch (error) {
            console.error('Error evaluating code:', error);
            setEvaluation('Error evaluating code');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
            {/* Left Panel */}
            <div className="p-6 border-r border-gray-300 bg-white lg:w-1/2 overflow-y-auto shadow-lg">
                <h1 className="text-3xl font-bold mb-4">Code Editor</h1>
                <h2 className="mt-4 text-xl font-semibold">Question:</h2>
                <pre className="p-4 border border-gray-300 bg-gray-50 rounded shadow overflow-y-auto whitespace-pre-wrap mt-2">
                    {question || 'Loading question...'}
                </pre>
                <h2 className="mt-4 text-xl font-semibold">Solution:</h2>
                <pre className="p-4 border border-gray-300 bg-gray-50 rounded shadow overflow-y-auto whitespace-pre-wrap mt-2">
                    {solution || 'Solution will be displayed here after code execution.'}
                </pre>
                <h2 className="mt-4 text-xl font-semibold">Evaluation:</h2>
                <pre className="p-4 border border-gray-300 bg-gray-50 rounded shadow overflow-y-auto whitespace-pre-wrap mt-2">
                    {evaluation || 'Evaluation will be displayed here after evaluation.'}
                </pre>
            </div>

            {/* Right Panel */}
            <div className="p-6 bg-white lg:w-1/2 flex flex-col">
                <h2 className="text-xl font-semibold">Write your code:</h2>
                <form onSubmit={handleCodeRun} className="flex flex-col">
                    <Editor
                        height="50vh"
                        language="cpp"
                        value={userCode}
                        onChange={(value) => setUserCode(value || '')}
                        theme="vs-dark"
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                        }}
                        className="mt-4"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        {loading ? 'Running...' : 'Run Code'}
                    </button>
                </form>

                <h2 className="mt-4 text-xl font-semibold">Output:</h2>
                <pre className="p-4 border border-gray-300 bg-gray-50 rounded shadow overflow-y-auto whitespace-pre-wrap mt-2">
                    {output || 'Output will be displayed here after code execution.'}
                </pre>

                <button
                    onClick={handleEvaluateCode}
                    disabled={loading}
                    className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                >
                    {loading ? 'Evaluating...' : 'Evaluate Code'}
                </button>
            </div>
        </div>
    );
};

export default CodeEditor;
