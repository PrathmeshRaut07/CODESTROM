import React, { useState } from 'react';
import axios from 'axios';
import ReactFlow, { Background, Controls, MiniMap } from 'react-flow-renderer';

const Roadmap: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/generate-roadmap/', {
        job_description: jobDescription,
      });
      // Extract the roadmap content
      let content = response.data.roadmap;
      
      // Remove code block formatting
      content = content.replace(/```csv/g, '').replace(/```/g, '').trim();
      
      setRoadmap(content);
    } catch (error) {
      console.error('Error generating roadmap:', error);
    }
    setLoading(false);
  };

  // Parse the CSV format and convert it to nodes and edges
  const steps = roadmap
    .split('\n')
    .slice(1) // Skip the header line "Step Number, Description"
    .map(line => line.split(','))
    .filter(parts => parts.length === 2) // Ensure we have "Step Number" and "Description"
    .map(([stepNumber, description]) => ({ id: stepNumber.trim(), label: description.trim() }));

  const nodes = steps.map((step, index) => ({
    id: step.id,
    data: { label: step.label },
    position: { x: index * 250, y: 0 }, // Adjust position as needed
  }));

  const edges = steps
    .slice(1)
    .map((_, index) => ({
      id: `e${index + 1}-${index + 2}`,
      source: steps[index].id,
      target: steps[index + 1].id,
      type: 'smoothstep',
    }));

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Roadmap Generator</h1>
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-4"
        rows={4}
        placeholder="Enter a job description..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={generateRoadmap}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Roadmap'}
      </button>
      {roadmap && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <h2 className="font-semibold text-lg mb-2">Generated Roadmap:</h2>
          <pre className="whitespace-pre-wrap">{roadmap}</pre>
        </div>
      )}

      {/* Visualization Section */}
      {steps.length > 0 && (
        <div style={{ height: 400, marginTop: '20px', border: '1px solid gray' }}>
          <ReactFlow
            nodes={nodes} // Use `nodes` prop instead of `elements`
            edges={edges} // Use `edges` prop
            style={{ width: '100%', height: '100%' }}
            nodesConnectable={false}
            nodesDraggable={false}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      )}
    </div>
  );
};

export default Roadmap;
