
import React, { useState, useEffect } from 'react';
import { getProgressData } from '../services/progressService';
import { MOTIVATIONAL_QUOTES } from '../constants';
import { ProgressData, Subject } from '../types';
import CircularProgress from '../components/CircularProgress';
import Card from '../components/Card';

const Dashboard: React.FC = () => {
    const [progress, setProgress] = useState<ProgressData | null>(null);
    const [quote, setQuote] = useState('');

    useEffect(() => {
        setProgress(getProgressData());
        setQuote(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
    }, []);

    const subjects = Object.values(Subject);
    const overallCompletion = progress ? 
        subjects.reduce((acc, subj) => acc + (progress[subj]?.completed || 0), 0) : 0;
    const totalQuizzes = progress ?
        subjects.reduce((acc, subj) => acc + (progress[subj]?.total || 0), 0) : 0;
    
    const overallAccuracy = progress ? 
        (subjects.flatMap(subj => progress[subj]?.scores || []).reduce((acc, score) => acc + score, 0) / 
         subjects.flatMap(subj => progress[subj]?.scores || []).length) || 0 : 0;

    const gateReadinessScore = Math.round((overallCompletion / (totalQuizzes || 1)) * 50 + (overallAccuracy / 100) * 50);

    const getNextAction = (): string => {
        if (!progress) return "Start with any subject to begin your journey!";
        
        const weakestSubject = subjects.map(subj => {
            const subjData = progress[subj];
            if (!subjData || subjData.scores.length === 0) return { subject: subj, avgScore: 101 }; // Prioritize unattempted
            const avgScore = subjData.scores.reduce((a, b) => a + b, 0) / subjData.scores.length;
            return { subject: subj, avgScore };
        }).sort((a, b) => a.avgScore - b.avgScore)[0];

        if (weakestSubject.avgScore === 101) return `Begin with a quiz on ${weakestSubject.subject}.`;
        return `Focus on ${weakestSubject.subject} to improve your average score of ${weakestSubject.avgScore.toFixed(2)}%.`;
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <header>
                <h1 className="text-3xl font-black text-white sm:text-4xl">Dashboard</h1>
                <p className="mt-2 text-lg text-cyan-300">Engineering Intelligence for AIR-1 Aspirants</p>
            </header>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <h3 className="text-sm font-medium text-gray-400">GATE Readiness Score</h3>
                    <p className="mt-2 text-4xl font-bold text-cyan-400">{gateReadinessScore}<span className="text-2xl">%</span></p>
                    <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
                        <div className="bg-gradient-to-r from-cyan-500 to-green-500 h-2.5 rounded-full" style={{ width: `${gateReadinessScore}%` }}></div>
                    </div>
                </Card>
                <Card>
                    <h3 className="text-sm font-medium text-gray-400">AIR-1 Readiness</h3>
                     <p className="mt-2 text-4xl font-bold text-green-400">{overallAccuracy.toFixed(1)}<span className="text-2xl">%</span></p>
                     <p className="text-xs text-gray-500 mt-2">Overall Accuracy</p>
                </Card>
                <Card>
                     <h3 className="text-sm font-medium text-gray-400">Quizzes Completed</h3>
                     <p className="mt-2 text-4xl font-bold text-white">{overallCompletion}</p>
                     <p className="text-xs text-gray-500 mt-2">Across all subjects</p>
                </Card>
                 <Card variant="accent">
                    <h3 className="text-sm font-medium text-cyan-200">Suggested Next Action</h3>
                    <p className="mt-2 text-lg font-semibold text-white">{getNextAction()}</p>
                </Card>
            </div>

            <Card>
                <h2 className="text-xl font-bold text-white mb-6">Subject-wise Progress</h2>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                    {subjects.map(subject => {
                        const subjectProgress = progress?.[subject];
                        const percentage = subjectProgress && subjectProgress.total > 0 ? (subjectProgress.completed / subjectProgress.total) * 100 : 0;
                        const avgScore = subjectProgress && subjectProgress.scores.length > 0 ? (subjectProgress.scores.reduce((a,b) => a+b, 0) / subjectProgress.scores.length) : 0;
                        return (
                            <div key={subject} className="flex flex-col items-center text-center">
                                <CircularProgress percentage={avgScore} size={80} strokeWidth={8} />
                                <h4 className="mt-3 text-xs font-semibold text-gray-200">{subject}</h4>
                                <p className="text-xs text-gray-500">{subjectProgress?.completed || 0} quizzes</p>
                            </div>
                        );
                    })}
                </div>
            </Card>

            <Card>
                <blockquote className="text-center">
                    <p className="text-lg italic text-gray-300">"{quote}"</p>
                </blockquote>
            </Card>
        </div>
    );
};

export default Dashboard;
