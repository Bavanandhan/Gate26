
import React, { useState, useEffect, useCallback } from 'react';
import { Subject, Difficulty, Question } from '../types';
import { getQuestions } from '../services/quizService';
import QuizResult from './QuizResult';
import Button from '../components/Button';
import Card from '../components/Card';

interface QuizProps {
  subject: Subject;
  difficulty: Difficulty;
  onQuizEnd: () => void;
}

const Quiz: React.FC<QuizProps> = ({ subject, difficulty, onQuizEnd }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [time, setTime] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const fetchedQuestions = getQuestions(subject, difficulty);
    setQuestions(fetchedQuestions);
    setAnswers(new Array(fetchedQuestions.length).fill(null));
  }, [subject, difficulty]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!quizFinished) {
        setTime(prevTime => prevTime + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [quizFinished]);

  const handleAnswer = (optionIndex: number) => {
    if (showFeedback) return;
    setSelectedOption(optionIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setQuizFinished(true);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (quizFinished) {
    return (
        <QuizResult
            subject={subject}
            difficulty={difficulty}
            answers={answers}
            questions={questions}
            timeTaken={time}
            onRetry={onQuizEnd}
        />
    );
  }

  if (questions.length === 0) {
    return <div className="text-center text-xl">Loading questions...</div>;
  }

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  const isCorrect = selectedOption !== null && selectedOption === currentQuestion.correctAnswerIndex;

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-cyan-400">{subject} - {difficulty}</h2>
          <div className="text-lg font-mono text-gray-300">
            <span>{String(Math.floor(time / 60)).padStart(2, '0')}</span>:
            <span>{String(time % 60).padStart(2, '0')}</span>
          </div>
        </div>
        
        <div className="mb-4">
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-gray-300">Question {currentQuestionIndex + 1} of {questions.length}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-cyan-500 to-green-500 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
        </div>
        
        <div className="p-4 bg-gray-900/50 rounded-lg">
            <p className="text-lg font-medium text-white">{currentQuestion.question}</p>
        </div>
        
        <div className="mt-6 space-y-4">
          {currentQuestion.options.map((option, index) => {
            let optionClass = "bg-gray-800 hover:bg-gray-700";
            if(showFeedback) {
                if(index === currentQuestion.correctAnswerIndex) {
                    optionClass = "bg-green-500/30 border-green-500 text-green-300";
                } else if (index === selectedOption) {
                    optionClass = "bg-red-500/30 border-red-500 text-red-300";
                }
            } else if (index === selectedOption) {
                optionClass = "bg-cyan-600/50 border-cyan-500";
            }
            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                className={`w-full text-left p-4 rounded-lg border border-transparent transition-all duration-200 flex items-center ${optionClass}`}
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center font-bold text-sm text-gray-300 mr-4">{String.fromCharCode(65 + index)}</span>
                {option}
              </button>
            );
          })}
        </div>

        {showFeedback && (
             <Card variant="darker" className="mt-6 animate-fade-in">
                <h4 className="font-bold text-lg mb-2">{isCorrect ? 'Correct!' : 'Incorrect'}</h4>
                <p className="text-gray-300"><strong className="text-cyan-400">Explanation:</strong> {currentQuestion.explanation}</p>
             </Card>
        )}
        
        {showFeedback && (
            <div className="mt-6 text-right">
                <Button onClick={handleNext}>
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </Button>
            </div>
        )}
      </Card>
    </div>
  );
};

export default Quiz;
