"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { askPatientAi } from "@/services/aiService";
import ReactMarkdown from "react-markdown";
import pdfToText from "react-pdftotext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send, X, FileText } from "lucide-react";

const AI_CONTEXT = `You are a helpful AI medical assistant. 
Provide clear, structured, professional, empathetic, and supportive responses. 
Limit answers to a maximum of 5 bullet points or 5 numbered items when using lists.`;

const thinkingMessages = [
  "AI is thinking...",
  "Analyzing your question...",
  "Consulting medical knowledge...",
  "Preparing response...",
];

function AiThinkingLoader() {
  const [msgIndex, setMsgIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % thinkingMessages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex items-center gap-2 text-gray-500 text-sm italic">
      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" />
      {thinkingMessages[msgIndex]}
    </div>
  );
}

function UserMessage({ content }) {
  return (
    <div className="flex justify-end">
      <div className="bg-primary-500 text-white rounded-lg px-4 py-2 max-w-[75%] text-sm">
        {content}
      </div>
    </div>
  );
}

function AiMessage({ content }) {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2 max-w-[75%] text-sm prose prose-sm">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

function PdfPreviewCard({ file, onRemove }) {
  const sizeKb = (file.size / 1024).toFixed(1);
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded px-3 py-2 text-sm">
      <FileText className="h-4 w-4 text-gray-500" />
      <span className="flex-1 truncate">{file.name}</span>
      <span className="text-gray-400">{sizeKb} KB</span>
      <button onClick={onRemove} className="text-gray-400 hover:text-red-500">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function PatientAIPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [pdfContent, setPdfContent] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { mutate, isPending } = useMutation({
    mutationFn: askPatientAi,
    onSuccess: (res) => {
      const aiText = res.data.text;
      setMessages((prev) => [...prev, { role: "assistant", content: aiText }]);
      setConversationHistory((prev) => [
        ...prev,
        { role: "assistant", content: aiText },
      ]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    },
  });

  const handleSend = () => {
    if (!input.trim() || isPending) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setConversationHistory((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);
    setInput("");

    mutate({
      input: userMessage,
      pdfContent,
      context: AI_CONTEXT,
      conversationHistory,
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPdfFile(file);
    try {
      const text = await pdfToText(file);
      setPdfContent(text);
    } catch {
      setPdfContent("");
    }
  };

  const handleRemovePdf = () => {
    setPdfFile(null);
    setPdfContent("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">AI Medical Assistant</h1>

      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-lg">How can I help you today?</p>
            <p className="text-sm mt-2">
              Ask me any medical questions or upload a PDF document for context.
            </p>
          </div>
        )}
        {messages.map((msg, i) =>
          msg.role === "user" ? (
            <UserMessage key={i} content={msg.content} />
          ) : (
            <AiMessage key={i} content={msg.content} />
          ),
        )}
        {isPending && <AiThinkingLoader />}
        <div ref={bottomRef} />
      </div>

      <div className="sticky bottom-0 bg-white pt-2">
        {pdfFile && (
          <div className="mb-2">
            <PdfPreviewCard file={pdfFile} onRemove={handleRemovePdf} />
          </div>
        )}
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your medical question..."
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isPending}
            size="icon"
            className="bg-primary-500 hover:bg-primary-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}