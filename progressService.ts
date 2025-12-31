
import { QuizResult, ProgressData, Subject } from '../types';

const PROGRESS_KEY = 'neutrinom_gate_progress';
const HISTORY_KEY = 'neutrinom_gate_history';

export const saveQuizResult = (result: QuizResult): void => {
  try {
    // Save to history
    const history: QuizResult[] = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    history.unshift(result);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 50))); // Keep last 50 results

    // Update progress data
    const progress: ProgressData = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
    if (!progress[result.subject]) {
      progress[result.subject] = { completed: 0, total: 1, scores: [] }; // Set total to 1 for first quiz
    }
    progress[result.subject].completed += 1;
    // A simple way to track total available quizzes, can be improved
    progress[result.subject].total = Math.max(progress[result.subject].total, progress[result.subject].completed, 5);
    
    const accuracy = (result.score / result.totalQuestions) * 100;
    progress[result.subject].scores.push(accuracy);
    
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Failed to save quiz result:", error);
  }
};

export const getProgressData = (): ProgressData => {
  try {
    const data = localStorage.getItem(PROGRESS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Failed to get progress data:", error);
    return {};
  }
};

export const getQuizHistory = (): QuizResult[] => {
    try {
        const data = localStorage.getItem(HISTORY_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Failed to get quiz history:", error);
        return [];
    }
}
