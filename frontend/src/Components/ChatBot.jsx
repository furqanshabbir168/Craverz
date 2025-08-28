import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { MessageCircle, X, ArrowLeft, RotateCcw, HelpCircle, Heart, Loader2 } from 'lucide-react';
import { ShopContext } from '../Context/ShopContext';

const CravezChatBot = () => {
  const {url} = useContext(ShopContext);
  const [isOpen, setIsOpen] = useState(false);
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentStep, setCurrentStep] = useState('topics');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! Welcome to Cravez Support! How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'message'
    }
  ]);

  // ref for auto-scroll
  const messagesEndRef = useRef(null);

  // Auto scroll whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // API call to fetch FAQ data
  const fetchFAQData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${url}/api/faq/fetch`);
      const data = response.data;
      setTopics(data);
      addBotTopicSelection(data); // pass data directly
    } catch (error) {
      console.error('Error fetching FAQ data:', error);
      addBotMessage("Sorry, I couldn't load the FAQ data. Please try refreshing or contact our support team.");
      setTopics([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && topics.length === 0) {
      fetchFAQData();
    }
  }, [isOpen]);

  // --- Helpers ---
  const addBotMessage = (text, type = 'message') => {
    const newMessage = {
      id: Date.now(),
      text,
      sender: 'bot',
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotTopicSelection = (topicsData) => {
    const topicMessage = {
      id: Date.now(),
      text: "Please choose a topic you'd like to know more about:",
      sender: 'bot',
      timestamp: new Date(),
      type: 'topic-selection',
      options: topicsData
    };
    setMessages(prev => [...prev, topicMessage]);
  };

  const addBotQuestionSelection = (topic) => {
    const questionMessage = {
      id: Date.now(),
      text: `Here are the most common questions about ${topic.topic}:`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'question-selection',
      options: topic.questions,
      showBackToTopics: true
    };
    setMessages(prev => [...prev, questionMessage]);
  };

  const addBotNavigationOptions = () => {
    const navMessage = {
      id: Date.now(),
      text: "Would you like to:",
      sender: 'bot',
      timestamp: new Date(),
      type: 'navigation',
      showNavigation: true
    };
    setMessages(prev => [...prev, navMessage]);
  };

  const addUserMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date(),
      type: 'message'
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // --- Handlers ---
  const handleTopicSelect = (topic) => {
    addUserMessage(topic.topic);
    setCurrentTopic(topic);
    setCurrentStep('questions');
    addBotQuestionSelection(topic);
  };

  const handleQuestionSelect = (question) => {
    addUserMessage(question.question);
    setSelectedQuestion(question);
    setCurrentStep('answer');
    addBotMessage(question.answer);
    setTimeout(() => {
      addBotNavigationOptions();
    }, 500);
  };

  const handleBackToTopics = () => {
    addUserMessage("Show me other topics");
    setCurrentStep('topics');
    setCurrentTopic(null);
    addBotTopicSelection(topics);
  };

  const handleBackToQuestions = () => {
    addUserMessage("Ask another question about " + currentTopic?.topic);
    setCurrentStep('questions');
    setSelectedQuestion(null);
    addBotQuestionSelection(currentTopic);
  };

  const handleStartOver = () => {
    addUserMessage("Start over");
    setCurrentStep('topics');
    setCurrentTopic(null);
    setSelectedQuestion(null);
    addBotMessage("Sure! Let's start fresh. How can I help you today?");
    setTimeout(() => {
      addBotTopicSelection(topics);
    }, 500);
  };

  // --- Message Renderer ---
  const renderMessageContent = (message) => {
    if (message.type === 'topic-selection') {
      return (
        <div className="space-y-3">
          <div className="text-sm text-gray-700 mb-3">{message.text}</div>
          <div className="space-y-2">
            {message.options?.map(topic => (
              <button
                key={topic._id}
                className="w-full text-left p-3 rounded-lg bg-red-50 border border-red-200 hover:bg-red-100 hover:border-red-300 transition-all duration-200 text-red-800 text-sm font-medium"
                onClick={() => handleTopicSelect(topic)}
              >
                <Heart className="inline-block w-4 h-4 mr-2 text-red-500" />
                {topic.topic}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (message.type === 'question-selection') {
      return (
        <div className="space-y-3">
          <div className="text-sm text-gray-700 mb-3">{message.text}</div>
          <div className="space-y-2">
            {message.options?.map(question => (
              <button
                key={question._id}
                className="w-full text-left p-3 rounded-lg bg-red-50 border border-red-200 hover:bg-red-100 hover:border-red-300 transition-all duration-200 text-red-800 text-sm"
                onClick={() => handleQuestionSelect(question)}
              >
                <HelpCircle className="inline-block w-4 h-4 mr-2 text-red-500" />
                {question.question}
              </button>
            ))}
            {message.showBackToTopics && (
              <button
                className="w-full text-center p-3 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 text-gray-700 text-sm font-medium"
                onClick={handleBackToTopics}
              >
                <ArrowLeft className="inline-block w-4 h-4 mr-2" />
                Back to Topics
              </button>
            )}
          </div>
        </div>
      );
    }

    if (message.type === 'navigation') {
      return (
        <div className="space-y-3">
          <div className="text-sm text-gray-700 mb-3">{message.text}</div>
          <div className="space-y-2">
            <button
              className="w-full text-center p-3 rounded-lg bg-green-50 border border-green-200 hover:bg-green-100 hover:border-green-300 transition-all duration-200 text-green-800 text-sm font-medium"
              onClick={handleBackToQuestions}
            >
              <HelpCircle className="inline-block w-4 h-4 mr-2" />
              Ask Another Question
            </button>
            <button
              className="w-full text-center p-3 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 text-blue-800 text-sm font-medium"
              onClick={handleBackToTopics}
            >
              <ArrowLeft className="inline-block w-4 h-4 mr-2" />
              Browse Other Topics
            </button>
            <button
              className="w-full text-center p-3 rounded-lg bg-orange-50 border border-orange-200 hover:bg-orange-100 hover:border-orange-300 transition-all duration-200 text-orange-800 text-sm font-medium"
              onClick={handleStartOver}
            >
              <RotateCcw className="inline-block w-4 h-4 mr-2" />
              Start Over
            </button>
          </div>
        </div>
      );
    }

    // Regular message
    return <div className="text-sm leading-relaxed">{message.text}</div>;
  };

  return (
    <div className="font-sans">
      {/* Chat Button */}
      <button
        className="fixed bottom-5 right-5 w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center transform hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 w-96 max-w-[90vw] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Cravez Support</h3>
                <p className="text-red-100 text-sm">We're here to help!</p>
              </div>
              <button
                className="text-white hover:text-red-200 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${
                  message.sender === 'bot' 
                    ? 'bg-white text-gray-800 rounded-2xl rounded-tl-md shadow-sm border border-gray-100' 
                    : 'bg-red-500 text-white rounded-2xl rounded-tr-md shadow-sm'
                } p-4`}>
                  {renderMessageContent(message)}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-2xl rounded-tl-md shadow-sm border border-gray-100 p-4">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                    <span className="text-sm">Loading Cravez support topics...</span>
                  </div>
                </div>
              </div>
            )}

            {/* scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="text-center text-xs text-gray-500">
              Powered by <span className="font-semibold text-red-500">Cravez</span> Support
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CravezChatBot;
