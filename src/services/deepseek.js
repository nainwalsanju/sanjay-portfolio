import axios from 'axios';

const API_KEY = process.env.REACT_APP_DEEPSEEK_API_KEY;
const BASE_URL = 'https://api.deepseek.com/v1'; // OpenAI-compatible endpoint :cite[1]:cite[5]

const systemMessage = `You are an AI assistant for Sanjay's developer portfolio. 
Answer questions about skills, experience, and projects using these rules:
1. Keep responses under 400 words
2. Use bullet points for lists
3. Maintain professional tone
4. Reference only information from the portfolio
5. For technical questions, provide brief code examples when relevant

If asked about something not in the portfolio, respond:
"Sorry, I only have information about Sanjay's professional background and portfolio projects."`;

// Create headers configuration
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_KEY}`
};

export const getDeepSeekResponse = async (message, history = []) => {
  const systemMessage = `You are an AI assistant for a developer portfolio. 
  Answer questions about the developer's skills, experience, and projects based on their portfolio content.`;

  const data = {
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: systemMessage },
      ...history,
      { role: 'user', content: message }
    ],
    temperature: 0.5,
    stream: false
  };

  try {
    const response = await axios.post(`${BASE_URL}/chat/completions`, data, { headers });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};