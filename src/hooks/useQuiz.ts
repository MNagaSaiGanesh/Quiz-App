import { useState, useEffect, useCallback } from 'react';
import { Question, QuizState, QuizResult } from '../types';
import quizAPI from '../services/api';

export const useQuiz = (timeLimit: number = 300) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    selectedAnswers: [],
    timeLeft: timeLimit,
    isStarted: false,
    isCompleted: false,
    isSubmitting: false
  });
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load questions
  const loadQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedQuestions = await quizAPI.getQuestions();
      setQuestions(fetchedQuestions);
      setQuizState(prev => ({
        ...prev,
        selectedAnswers: Array(fetchedQuestions.length).fill(null)
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load questions');
    } finally {
      setLoading(false);
    }
  }, []);

  // Timer effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (quizState.isStarted && !quizState.isCompleted && quizState.timeLeft > 0) {
      intervalId = setInterval(() => {
        setQuizState(prev => {
          const newTimeLeft = prev.timeLeft - 1;
          if (newTimeLeft <= 0) {
            // Auto-submit when time runs out
            handleSubmit();
            return { ...prev, timeLeft: 0 };
          }
          return { ...prev, timeLeft: newTimeLeft };
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [quizState.isStarted, quizState.isCompleted, quizState.timeLeft]);

  // Start quiz
  const startQuiz = useCallback(() => {
    setQuizState(prev => ({ ...prev, isStarted: true }));
  }, []);

  // Select answer
  const selectAnswer = useCallback((answerIndex: number) => {
    setQuizState(prev => {
      const newAnswers = [...prev.selectedAnswers];
      newAnswers[prev.currentQuestion] = answerIndex;
      return { ...prev, selectedAnswers: newAnswers };
    });
  }, []);

  // Navigate to next question
  const nextQuestion = useCallback(() => {
    setQuizState(prev => {
      if (prev.currentQuestion < questions.length - 1) {
        return { ...prev, currentQuestion: prev.currentQuestion + 1 };
      }
      return prev;
    });
  }, [questions.length]);

  // Navigate to previous question
  const previousQuestion = useCallback(() => {
    setQuizState(prev => {
      if (prev.currentQuestion > 0) {
        return { ...prev, currentQuestion: prev.currentQuestion - 1 };
      }
      return prev;
    });
  }, []);

  // Submit quiz
  const handleSubmit = useCallback(async () => {
    if (quizState.isSubmitting) return;

    try {
      setQuizState(prev => ({ ...prev, isSubmitting: true }));
      const timeSpent = timeLimit - quizState.timeLeft;
      const quizResult = await quizAPI.submitQuiz(quizState.selectedAnswers, timeSpent);
      setResult(quizResult);
      setQuizState(prev => ({ ...prev, isCompleted: true, isSubmitting: false }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit quiz');
      setQuizState(prev => ({ ...prev, isSubmitting: false }));
    }
  }, [quizState.selectedAnswers, quizState.timeLeft, quizState.isSubmitting, timeLimit]);

  // Restart quiz
  const restartQuiz = useCallback(() => {
    setQuizState({
      currentQuestion: 0,
      selectedAnswers: Array(questions.length).fill(null),
      timeLeft: timeLimit,
      isStarted: false,
      isCompleted: false,
      isSubmitting: false
    });
    setResult(null);
    setError(null);
  }, [questions.length, timeLimit]);

  // Format time helper
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Load questions on component mount
  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  return {
    questions,
    quizState,
    result,
    loading,
    error,
    startQuiz,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    handleSubmit,
    restartQuiz,
    formatTime
  };
};
