
import React, { useEffect } from 'react';
import { Subject, Difficulty, Question, QuizResult as QuizResultType } from '../types';
import { saveQuizResult } from '../services/progressService';
import Button from '../components/Button';
import Card from '../components/Card';
import CircularProgress from '../components/CircularProgress';

interface QuizResultProps {
  subject: Subject;
  difficulty: Difficulty;
  answers: (number | null)[];
  questions: Question[];
  timeTaken: number;
  onRetry: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({ subject, difficulty, answers, questions, timeTaken, onRetry }) => {
  const score = answers.reduce((acc, answer, index) => {
    return answer === questions[index].correctAnswerIndex ? acc + 1 : acc;
  }, 0);
  
  const accuracy = (score / questions.length) * 100;

  useEffect(() => {
    const result: QuizResultType = {
      subject,
      difficulty,
      score,
      totalQuestions: questions.length,
      timeTaken,
      answers,
      date: Date.now(),
    };
    saveQuizResult(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWeakAreas = () => {
    const incorrectCount = questions.length - score;
    if (incorrectCount === 0) return "No weak areas found. Excellent performance!";
    if (incorrectCount <= 3) return "Minimal errors. Review the explanations for incorrect answers.";
    return "Significant room for improvement. Revisit the fundamental concepts of this subject.";
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Card>
        <div className="text-center">
          <h1 className="text-3xl font-black text-white">Quiz Report</h1>
          <p className="mt-2 text-cyan-400">{subject} - {difficulty}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
             <CircularProgress percentage={accuracy} size={120} strokeWidth={10} />
             <h3 className="text-lg font-bold text-white mt-4">Accuracy</h3>
          </div>
          <Card variant="darker" className="flex flex-col justify-center items-center">
            <p className="text-5xl font-bold text-cyan-400">{score}/{questions.length}</p>
            <h3 className="text-lg font-semibold text-gray-300 mt-2">Score</h3>
          </Card>
           <Card variant="darker" className="flex flex-col justify-center items-center">
            <p className="text-5xl font-bold text-cyan-400">
                {String(Math.floor(timeTaken / 60)).padStart(2, '0')}:
                {String(timeTaken % 60).padStart(2, '0')}
            </p>
            <h3 className="text-lg font-semibold text-gray-300 mt-2">Time Taken</h3>
          </Card>
        </div>

        <div className="mt-8">
            <Card variant="darker">
                <h3 className="text-xl font-bold text-white">Performance Analysis</h3>
                <p className="mt-2 text-gray-300">{getWeakAreas()}</p>
            </Card>
        </div>
        
        <div className="mt-6">
            <h3 className="text-xl font-bold text-white mb-4">Review Your Answers</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {questions.map((q, index) => {
                    const userAnswer = answers[index];
                    const isCorrect = userAnswer === q.correctAnswerIndex;
                    return (
                        <div key={q.id} className={`p-4 rounded-lg border ${isCorrect ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
                            <p className="font-semibold text-gray-200">{index + 1}. {q.question}</p>
                            <p className="text-sm mt-2">Your answer: <span className="font-mono">{userAnswer !== null ? q.options[userAnswer] : 'Not Answered'}</span></p>
                             <p className="text-sm">Correct answer: <span className="font-mono">{q.options[q.correctAnswerIndex]}</span></p>
                        </div>
                    )
                })}
            </div>
        </div>

        <div className="mt-8 flex justify-center">
            <Button onClick={onRetry}>Take Another Quiz</Button>
        </div>
      </Card>
    </div>
  );
};

export default QuizResult;
