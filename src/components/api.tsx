// src/api.ts
import axios from 'axios';

// Set the base URL for your FastAPI backend
const API_BASE_URL = 'http://localhost:8000';

// Function to start the group discussion
export const startDiscussion = async (discussionId: string, topic: string) => {
  const response = await axios.post(`${API_BASE_URL}/start_discussion`, {
    discussion_id: discussionId,
    topic
  });
  return response.data;
};

// Function to continue the group discussion
export const continueDiscussion = async (discussionId: string, userInput: string) => {
  const response = await axios.post(`${API_BASE_URL}/continue_discussion`, {
    discussion_id: discussionId,
    user_input: userInput
  });
  return response.data;
};
