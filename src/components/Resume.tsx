import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const Resume: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [enhancedResume, setEnhancedResume] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPdfFile(event.target.files[0]);
    }
  };

  const handleJobDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (pdfFile) {
      console.log('Uploading PDF:', pdfFile);

      const formData = new FormData();
      formData.append('resume', pdfFile);
      formData.append('job_description', jobDescription);

      try {
        const response = await fetch('http://localhost:8000/process-resume', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setEnhancedResume(data.response);
      } catch (error) {
        console.error('Error processing the resume:', error);
        alert('Error processing the resume. Please try again.');
      }

      setPdfFile(null);
    } else {
      alert('Please select a PDF file to upload.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 px-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10">Resume Enhancer</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-xl shadow-xl transition-transform transform hover:scale-105"
      >
        <label
          htmlFor="fileInput"
          className="block text-lg text-gray-700 font-semibold mb-2"
        >
          Upload your resume (PDF):
        </label>
        <div className="mb-6">
          <input
            type="file"
            id="fileInput"
            accept=".pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 focus:outline-none focus:border-indigo-500 p-2"
          />
        </div>

        <label
          htmlFor="jobDescription"
          className="block text-lg text-gray-700 font-semibold mb-2"
        >
          Job Description:
        </label>
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={handleJobDescriptionChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 focus:outline-none focus:border-indigo-500 p-2"
          rows={5}
        ></textarea>

        <button
          type="submit"
          className="w-full mt-6 px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          JD Based Project Suggestions
        </button>
      </form>

      {enhancedResume && (
        <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-xl mt-10 transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Enhanced Resume:</h2>
          <ReactMarkdown className="text-gray-700 whitespace-pre-wrap">
            {enhancedResume}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default Resume;
