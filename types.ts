
export enum Subject {
  EngineeringMathematics = "Engineering Mathematics",
  EngineeringMechanics = "Engineering Mechanics",
  StrengthOfMaterials = "Strength of Materials",
  TheoryOfMachines = "Theory of Machines",
  FluidMechanics = "Fluid Mechanics",
  HeatTransfer = "Heat Transfer",
  ManufacturingEngineering = "Manufacturing Engineering",
}

export enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Quiz {
  subject: Subject;
  difficulty: Difficulty;
  questions: Question[];
}

export interface QuizResult {
  subject: Subject;
  difficulty: Difficulty;
  score: number;
  totalQuestions: number;
  timeTaken: number; // in seconds
  answers: (number | null)[];
  date: number; // timestamp
}

export interface ProgressData {
  [key: string]: {
    completed: number;
    total: number;
    scores: number[];
  };
}

export enum Page {
    Dashboard = 'Dashboard',
    Quiz = 'Quiz',
    AboutNeutrinom = 'About NEUTRINOM',
    AboutAuthor = 'About the Author',
}
