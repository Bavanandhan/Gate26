
import React, { useState } from 'react';
import { Subject, Difficulty } from '../types';
import Quiz from './Quiz';
import Button from '../components/Button';
import Card from '../components/Card';

const QuizSetup: React.FC = () => {
  const [subject, setSubject] = useState<Subject>(Subject.EngineeringMathematics);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Medium);
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    setQuizStarted(true);
  };

  if (quizStarted) {
    return <Quiz subject={subject} difficulty={difficulty} onQuizEnd={() => setQuizStarted(false)} />;
  }

  return (
    <div className="flex items-center justify-center min-h-full animate-fade-in">
        <Card className="w-full max-w-lg">
            <div className="text-center">
                <h1 className="text-3xl font-black text-white">Configure Your Quiz</h1>
                <p className="mt-2 text-cyan-400">Select subject and difficulty to test your knowledge.</p>
            </div>

            <form onSubmit={startQuiz} className="mt-8 space-y-6">
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subject</label>
                    <select
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value as Subject)}
                        className="mt-1 block w-full pl-3 pr-10 py-3 text-base bg-gray-800 border-gray-600 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md text-white"
                    >
                        {Object.values(Subject).map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300">Difficulty Level</label>
                    <div className="mt-2 grid grid-cols-3 gap-3">
                        {Object.values(Difficulty).map((d) => (
                             <button
                                type="button"
                                key={d}
                                onClick={() => setDifficulty(d)}
                                className={`px-4 py-3 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 ${
                                    difficulty === d 
                                    ? 'bg-cyan-500 text-white shadow-lg' 
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                <Button type="submit" className="w-full">
                    Start Quiz
                </Button>
            </form>
        </Card>
    </div>
  );
};

export default QuizSetup;
