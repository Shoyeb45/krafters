import React, { use, useEffect, useState } from 'react';
import { Volume2, BookOpen, Brain, Play, ChevronRight, X, Check, ArrowLeft, ArrowRight, MessageCircle, Send, User, Bot } from 'lucide-react';
import { useContext } from 'react';
import { DocumentContext } from '../../context/Provider';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import ShimmerPlaceholder from '../Shimmer';
import axios from 'axios';

const DocumentsSection = () => {
  const [dylexiaMode, setDylexiaMode] = useState(false);
  const { isOpenUploadBox, setIsOpenUploadBox, uploadedFiles, setUploadedFiles, documentSummary, setDocumentSummary, text, setText, loading, setLoading } = useContext(DocumentContext);
  const navigate = useNavigate();
  const [audioUrl, setAudioUrl] = useState(null);

  // Chat states
  const [isChatActive, setIsChatActive] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const { mlBackendUrl } = useContext(DocumentContext);

  const fetchAudioSummary = async () => {
    if (uploadedFiles.length === 0) return;

    const formData = new FormData();
    formData.append('file', uploadedFiles[0]);

    try {
      const response = await axios.get(mlBackendUrl + '/api/get_summary_audio', {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob'
      });

      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioObjectUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioObjectUrl);

      console.log('Audio summary fetched successfully');
    } catch (error) {
      console.error('Error fetching audio summary:', error);
    }
  }

  // Chat with document function
  const chatWithDocument = async (question) => {
    if (!text || !question.trim()) return;

    setIsLoadingChat(true);

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: question,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentQuestion('');

    try {
      const response = await axios.post(mlBackendUrl + '/api/chat', {
        text: text,
        question: question,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.ok) {
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          message: response.data.answer,
          timestamp: new Date()
        };

        setChatMessages(prev => [...prev, botMessage]);
      }

      console.log('Chat response:', response.data);
    } catch (error) {
      console.error('Error chatting with document:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: 'Sorry, I encountered an error while processing your question. Please try again.',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoadingChat(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (currentQuestion.trim()) {
      chatWithDocument(currentQuestion);
    }
  };

  const startChat = () => {
    setIsChatActive(true);
    if (chatMessages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        type: 'bot',
        message: 'Hello! I\'m here to help you understand your document better. Feel free to ask me any questions about the content.',
        timestamp: new Date()
      };
      setChatMessages([welcomeMessage]);
    }
  };

  const closeChat = () => {
    setIsChatActive(false);
  };

  const [hoveredWord, setHoveredWord] = useState(null);
  const [wordMeaning, setWordMeaning] = useState('');
  const [isLoadingMeaning, setIsLoadingMeaning] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const fetchWordMeaning = async (word, event) => {
    if (!word) return;

    setIsLoadingMeaning(true);
    setHoveredWord(word);
    setWordMeaning('');

    // Set tooltip position
    const rect = event.target.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });

    try {
      const response = await axios.get(mlBackendUrl + `/api/word_meaning?word=${word}`);
      if (response.data && response.data.meaning) {
        setWordMeaning(response.data.meaning);
      } else {
        setWordMeaning(`No meaning found for "${word}"`);
      }
    } catch (error) {
      console.error('Error fetching word meaning:', error);
      setWordMeaning('Error fetching word meaning. Please try again later.');
    } finally {
      setIsLoadingMeaning(false);
    }
  };

  const wrapWords = (input) => {
    if (typeof input === 'string') {
      return input.split(/(\s+)/).map((word, index) => {
        if (/^\s+$/.test(word)) return word; // Preserve whitespace
        const cleanWord = word.replace(/[^\w]/g, '');
        return (
          <span
            key={index}
            className="cursor-pointer hover:bg-yellow-200 hover:rounded transition-colors duration-150"
            onDoubleClick={(e) => {
              if (cleanWord) fetchWordMeaning(cleanWord, e);
            }}
            onMouseLeave={() => {
              setHoveredWord(null);
              setWordMeaning('');
              setIsLoadingMeaning(false);
            }}
          >
            {word}
          </span>
        );
      });
    } else if (Array.isArray(input)) {
      return input.map((child, index) => <React.Fragment key={index}>{wrapWords(child)}</React.Fragment>);
    } else if (React.isValidElement(input)) {
      return React.cloneElement(input, {
        ...input.props,
        children: wrapWords(input.props.children),
      });
    }

    return input;
  };

  const [quizzes, setQuizzes] = useState([]);
  const [isQuizGenerated, setIsQuizGenerated] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const fetchQuizzes = async () => {
    if (!text) return;

    try {
      const response = await axios.post(mlBackendUrl + '/api/generate_quiz', {
        text: text,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setQuizzes(response.data.quiz);
      setIsQuizGenerated(true);
      console.log('Quizzes fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  }

  const startQuiz = () => {
    setIsQuizActive(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setQuizResults(null);
  };

  const selectAnswer = (questionIndex, answer) => {
    setShowFeedback(false);
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));

    // Show feedback
    setIsCorrectAnswer(answer === quizzes[questionIndex].correct_answer);
    setShowFeedback(true);

    // Hide feedback after 2 seconds
    setTimeout(() => {
      setShowFeedback(false);
    }, 5000);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowFeedback(false);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowFeedback(false);
    }
  };

  const finishQuiz = () => {
    let correctCount = 0;
    quizzes.forEach((quiz, index) => {
      if (selectedAnswers[index] === quiz.correct_answer) {
        correctCount++;
      }
    });

    const results = {
      totalQuestions: quizzes.length,
      correctAnswers: correctCount,
      score: Math.round((correctCount / quizzes.length) * 100)
    };

    setQuizResults(results);
    setQuizCompleted(true);
  };

  const closeQuiz = () => {
    setIsQuizActive(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setQuizResults(null);
  };

  const currentQuiz = quizzes[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizzes.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  // Chat Interface
  if (isChatActive) {
    return (
      <div className={`w-full h-screen flex flex-col ${dylexiaMode ? 'font-dyslexia' : ''} bg-gray-50`}>
        {/* Chat Header */}
        <div className="bg-white py-4 px-6 border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={closeChat}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <X size={20} />
                Close Chat
              </button>
              <div className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-pwpurple" />
                Chat with Document
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDylexiaMode(!dylexiaMode)}
                className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${dylexiaMode
                  ? 'bg-pwpurple text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-purple-100'
                  }`}
              >
                Dyslexia Mode
              </button>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 bg-pwpurple rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-2xl px-4 py-3 rounded-lg ${message.type === 'user'
                    ? 'bg-pwpurple text-white'
                    : 'bg-white border border-gray-200 text-gray-800'
                    }`}
                >
                  {message.type === 'bot' ? (
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-2">{children}</p>,
                        li: ({ children }) => <li className="mb-1 list-disc ml-6">{children}</li>,
                        strong: ({ children }) => <strong>{children}</strong>,
                        em: ({ children }) => <em>{children}</em>,
                        h2: ({ children }) => <h2 className="text-lg font-bold mt-3 mb-2">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-base font-semibold mt-2 mb-1">{children}</h3>,
                      }}
                    >
                      {message.message}
                    </ReactMarkdown>
                  ) : (
                    <p className="whitespace-pre-wrap">{message.message}</p>
                  )}
                  <div className={`text-xs mt-1 ${message.type === 'user' ? 'text-purple-100' : 'text-gray-500'
                    }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isLoadingChat && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-pwpurple rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="max-w-2xl px-4 py-3 rounded-lg bg-white border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-pwpurple border-t-transparent"></div>
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Input */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <input
                type="text"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                placeholder="Ask a question about your document..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pwpurple focus:border-transparent"
                disabled={isLoadingChat || !text}
              />
              <button
                type="submit"
                disabled={isLoadingChat || !currentQuestion.trim() || !text}
                className={`px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 ${isLoadingChat || !currentQuestion.trim() || !text
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-pwpurple hover:bg-violet-600 text-white'
                  }`}
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </form>
            {!text && (
              <p className="text-sm text-gray-500 mt-2">
                Please upload a document first to start chatting.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isQuizActive) {
    return (
      <div className={`w-full h-screen overflow-y-auto ${dylexiaMode ? 'font-dyslexia' : ''} bg-gray-50`}>
        {/* Quiz Header */}
        <div className="bg-white py-4 px-6 border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={closeQuiz}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <X size={20} />
                Close Quiz
              </button>
              <div className="text-lg font-semibold text-gray-800">
                Question {currentQuestionIndex + 1} of {quizzes.length}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gray-200 rounded-full h-2 w-48">
                <div
                  className="bg-pwpurple h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / quizzes.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">
                {Math.round(((currentQuestionIndex + 1) / quizzes.length) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {!quizCompleted ? (
          /* Quiz Question */
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
                {currentQuiz?.question}
              </h2>
              {showFeedback && (
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-white p-4 shadow-lg ">
                    {isCorrectAnswer ? (
                      <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjRqcWpxcXhkZ25teXV0NW9wdmhvM2x4dTV2OXVqb2F4aWZieXJ1NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT77XWum9yH7zNkFW0/giphy.gif" alt="Correct!" className="w-32 h-32" />
                    ) : (
                      <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2E3NnYxOHM0cmRmeTUyODNyYmc5OTQ5cHY4YjIwc2FxdXd4YjU4bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6wrebnKWmvx4ZBio/giphy.gif" alt="Try again!" className="w-32 h-32" />
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {currentQuiz?.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(currentQuestionIndex, option)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${selectedAnswers[currentQuestionIndex] === option
                      ? 'border-pwpurple bg-purple-50 text-pwpurple'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedAnswers[currentQuestionIndex] === option
                        ? 'border-pwpurple bg-pwpurple'
                        : 'border-gray-300'
                        }`}>
                        {selectedAnswers[currentQuestionIndex] === option && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-gray-700">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={previousQuestion}
                  disabled={isFirstQuestion}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${isFirstQuestion
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                >
                  <ArrowLeft size={16} />
                  Previous
                </button>

                {isLastQuestion ? (
                  <button
                    onClick={finishQuiz}
                    disabled={!selectedAnswers[currentQuestionIndex]}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${selectedAnswers[currentQuestionIndex]
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                  >
                    Finish Quiz
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    disabled={!selectedAnswers[currentQuestionIndex]}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${selectedAnswers[currentQuestionIndex]
                      ? 'bg-pwpurple hover:bg-violet-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                  >
                    Next
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Quiz Results */
          <div className="max-w-2xl mx-auto px-6 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <div className="mb-6">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl font-bold text-white ${quizResults.score >= 70 ? 'bg-green-500' : quizResults.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}>
                  {quizResults.score}%
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
              <p className="text-gray-600 mb-6">
                You answered {quizResults.correctAnswers} out of {quizResults.totalQuestions} questions correctly.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{quizResults.totalQuestions}</div>
                  <div className="text-sm text-gray-600">Total Questions</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{quizResults.correctAnswers}</div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{quizResults.totalQuestions - quizResults.correctAnswers}</div>
                  <div className="text-sm text-gray-600">Incorrect</div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={startQuiz}
                  className="bg-pwpurple hover:bg-violet-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Retake Quiz
                </button>
                <button
                  onClick={closeQuiz}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Back to Document
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`w-full h-screen overflow-y-auto  ${dylexiaMode ? 'font-dyslexia ' : ''}`}>
      <div className="py-5 border-b border-gray-200 px-15">
        <div className="flex items-center justify-between ">

          <button className='flex items-center gap-1 text-lg font-semibold cursor-pointer text-gray-600 hover:text-gray-800 transition-colors duration-200'
            onClick={() => navigate('/disable')}>
            <ChevronLeft strokeWidth={3} size={20} />
            Back
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => setDylexiaMode(!dylexiaMode)}
              className={`px-3 py-3 rounded-full  transition-colors font-dyslexia duration-200 ${dylexiaMode
                ? 'bg-pwpurple text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-purple-100'
                }`}
            >
              Dyslexia Mode
            </button>
            <button className="bg-pwpurple text-lg hover:bg-violet-600 text-white px-3 py-1 rounded-full transition-colors duration-200"
              onClick={() => setIsOpenUploadBox(true)}
            >
              Upload Document
            </button>
          </div>
        </div>
      </div>

      <div className={`px-16 py-12 flex flex-col gap-10 ${dylexiaMode ? 'font-dyslexia ' : ''}`}>

       
        {/* Document Summary Section */}
        <div className={`${dylexiaMode ? 'font-dyslexia ' : null} relative`}>
          <h4 className="font-medium text-gray-800 mb-3 flex items-center">
            <BookOpen className="w-4 h-4 mr-2 text-pwpurple" />
            Document Summary
          </h4>
          <div className={`bg-gray-50 p-4 rounded-lg border border-gray-200`}>
            {loading ? (
              <ShimmerPlaceholder />
            ) : documentSummary ? (
              <div className="space-y-2 text-gray-700">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-2">{wrapWords(children)}</p>,
                    li: ({ children }) => <li className="mb-1 list-disc ml-6">{wrapWords(children)}</li>,
                    strong: ({ children }) => <strong>{wrapWords(children)}</strong>,
                    em: ({ children }) => <em>{wrapWords(children)}</em>,
                    h2: ({ children }) => <h2 className="text-xl font-bold mt-4 mb-2">{wrapWords(children)}</h2>,
                    h3: ({ children }) => <h3 className="text-lg font-semibold mt-3 mb-1">{wrapWords(children)}</h3>,
                  }}
                >
                  {documentSummary}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-gray-500">No summary available</div>
            )}
          </div>


          {/* Tooltip - keep this part unchanged */}
          {hoveredWord && (
            <div
              className="fixed z-50 bg-black text-white px-3 py-2 rounded-lg shadow-lg max-w-xs text-sm transform -translate-x-1/2 -translate-y-full"
              style={{
                left: `${tooltipPosition.x}px`,
                top: `${tooltipPosition.y}px`,
              }}
            >
              {isLoadingMeaning ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Loading meaning...</span>
                </div>
              ) : (
                <div>
                  <div className="font-semibold text-yellow-300 mb-1">{hoveredWord}</div>
                  <div>{wordMeaning}</div>
                </div>
              )}
              {/* Tooltip Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></div>
            </div>
          )}
        </div>

         {/* Audio Summary */}
         <div className="">
          <h4 className="font-medium text-gray-800 mb-3 flex items-center">
            <Volume2 className="w-4 h-4 mr-2 text-pwpurple" />
            Audio Summary
          </h4>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">Chapter 1 Summary</span>
              <button
                onClick={fetchAudioSummary}
                className="bg-pwpurple hover:bg-violet-600 text-white px-3 py-1 rounded text-xs transition-colors duration-200"
              >
                Generate Audio
              </button>
            </div>
            {audioUrl ? (
              <audio controls className="w-full">
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <div className="flex items-center gap-3">
                <button className="bg-gray-400 text-white p-2 rounded-full cursor-not-allowed">
                  <Play className="w-4 h-4" />
                </button>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-400 h-2 rounded-full w-0"></div>
                </div>
                <span className="text-xs text-gray-500">No audio available</span>
              </div>
            )}
          </div>
        </div>


        {/* Chat with Document Section */}
        <div className={`${dylexiaMode ? 'font-dyslexia ' : null} `}>
          <h4 className="font-medium text-gray-800 mb-3 flex items-center">
            <MessageCircle className="w-4 h-4 mr-2 text-pwpurple" />
            Chat with Document
          </h4>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">Ask questions about your document</span>
              <button
                onClick={startChat}
                disabled={!text}
                className={`px-3 py-1 rounded text-xs transition-colors duration-200 ${text
                  ? 'bg-pwpurple hover:bg-violet-600 text-white'
                  : 'bg-gray-400 text-white cursor-not-allowed'
                  }`}
              >
                Start Chat
              </button>
            </div>
            {!text ? (
              <div className="text-gray-500 text-sm">
                Upload a document first to start chatting
              </div>
            ) : (
              <div className="text-gray-600 text-sm">
                Click "Start Chat" to begin asking questions about your document content
              </div>
            )}
          </div>
        </div>

        {/* Start Quizzes Section */}
        <div className={`${dylexiaMode ? 'font-dyslexia ' : null} `}>
          <h4 className="font-medium text-gray-800 mb-3 flex items-center">
            <Brain className="w-4 h-4 mr-2 text-pwpurple" />
            Start Quizzes
            <button
              onClick={fetchQuizzes}
              className="ml-auto bg-pwpurple hover:bg-violet-600 text-white px-3 py-1 rounded text-xs transition-colors duration-200"
            >
              Generate Quiz
            </button>
          </h4>

          <div className="grid gap-3">
            {isQuizGenerated && quizzes.length > 0 ? (
              <>
                <button
                  onClick={startQuiz}
                  className="bg-gradient-to-r from-pwpurple to-purple-700 hover:from-purple-700 hover:to-pwpurple text-white p-4 rounded-lg text-left transition-all duration-200 transform hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium mb-1">Generated Quiz</h5>
                      <p className="text-purple-100 text-sm">
                        {quizzes.length} questions • 15 minutes
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </button>
              </>
            ) : (
              <>
                <button className="bg-gradient-to-r from-gray-400 to-gray-500 text-white p-4 rounded-lg text-left cursor-not-allowed">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium mb-1">Chapter 1 Quiz</h5>
                      <p className="text-gray-100 text-sm">Generate quiz first</p>
                    </div>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsSection;