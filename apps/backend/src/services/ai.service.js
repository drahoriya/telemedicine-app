const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { HumanMessage, AIMessage, SystemMessage } = require("@langchain/core/messages");

const askPatientAi = async ({ input, pdfContent, context, conversationHistory = [] }) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_API_KEY,
  });

  const buildUserPrompt = (userInput, pdf) => {
    const trimmedInput = typeof userInput === "string" ? userInput.trim() : "";
    const trimmedPdf = typeof pdf === "string" ? pdf.trim() : "";
    if (trimmedPdf) {
      return `${trimmedInput}\n\nPDF Content:\n${trimmedPdf}`;
    }
    return trimmedInput;
  };

  const getConversationMessages = (history) => {
    if (!Array.isArray(history)) return [];
    const recent = history.slice(-10);
    return recent
      .filter((msg) => msg && typeof msg.role === "string" && typeof msg.content === "string" && msg.content.trim())
      .map((msg) => {
        if (msg.role === "user") return new HumanMessage(msg.content);
        if (msg.role === "assistant") return new AIMessage(msg.content);
        return null;
      })
      .filter(Boolean);
  };

  const systemMessage = new SystemMessage(
    context || "You are a helpful AI medical assistant. Provide clear, structured responses."
  );

  const historyMessages = getConversationMessages(conversationHistory);
  const userPrompt = buildUserPrompt(input, pdfContent);
  const userMessage = new HumanMessage(userPrompt);

  const messages = [systemMessage, ...historyMessages, userMessage];

  const response = await model.invoke(messages);

  return response.content;
};

module.exports = {
  askPatientAi,
};
