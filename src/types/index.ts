export interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: number;
  category: string;
  difficulty: string;
  explanation: string;
}

export interface QuizState {
  currentQuestion: number;
  selectedAnswers: (number | null)[];
  timeLeft: number;
  isStarted: boolean;
  isCompleted: boolean;
  isSubmitting: boolean;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  timeSpent: number;
  detailedResults: DetailedResult[];
}

export interface DetailedResult {
  questionId: number;
  question: string;
  options: string[];
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  explanation: string;
  category: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
