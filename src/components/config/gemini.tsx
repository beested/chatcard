/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

console.log({ apiKey });

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

async function runChat(prompt: string) {
  // Adiciona a instrução para responder em português
  const promptInPortuguese = `Responda em português: ${prompt}`;

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(promptInPortuguese);
  const response = result.response;
  console.log(result.response.text());
  return response.text();
}

export default runChat;
