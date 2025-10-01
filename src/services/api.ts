import axios, { AxiosInstance } from 'axios';
import { Question, QuizResult, ApiResponse } from '../types';

// For demo purposes, we'll use mock data since this is frontend-only
// In production, replace with your actual backend API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

class QuizAPI {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Mock data for demo - replace with actual API calls
  private mockQuestions: Question[] = [
    {
      id: 1,
      question: "What is React primarily used for?",
      options: ["Backend API development", "Building user interfaces", "Database management", "Server configuration"],
      correct_answer: 1,
      category: "frontend",
      difficulty: "easy",
      explanation: "React is a JavaScript library for building user interfaces, particularly web applications."
    },
    {
      id: 2,
      question: "Which database is commonly used with Node.js applications?",
      options: ["Oracle", "MongoDB", "MySQL", "All of the above"],
      correct_answer: 3,
      category: "backend",
      difficulty: "medium",
      explanation: "Node.js can work with various databases including MongoDB, MySQL, PostgreSQL, and Oracle."
    },
    {
      id: 3,
      question: "What does API stand for?",
      options: ["Application Programming Interface", "Advanced Programming Integration", "Automated Program Interaction", "Application Process Interface"],
      correct_answer: 0,
      category: "general",
      difficulty: "easy",
      explanation: "API stands for Application Programming Interface, which allows different software applications to communicate."
    },
    {
      id: 4,
      question: "Which HTTP method is used to retrieve data?",
      options: ["POST", "GET", "PUT", "DELETE"],
      correct_answer: 1,
      category: "backend",
      difficulty: "easy",
      explanation: "GET is the HTTP method used to retrieve/fetch data from a server."
    },
    {
      id: 5,
      question: "What is the purpose of useState in React?",
      options: ["To handle routing", "To manage component state", "To make API calls", "To style components"],
      correct_answer: 1,
      category: "frontend",
      difficulty: "medium",
      explanation: "useState is a React hook that allows you to add state to functional components."
    },
    {
      id: 6,
      question: "Which of the following is a NoSQL database?",
      options: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
      correct_answer: 2,
      category: "database",
      difficulty: "medium",
      explanation: "MongoDB is a NoSQL (document-based) database, while the others are SQL databases."
    },
    {
      id: 7,
      question: "What does CSS stand for?",
      options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Coded Style Sheets"],
      correct_answer: 1,
      category: "frontend",
      difficulty: "easy",
      explanation: "CSS stands for Cascading Style Sheets, used for styling web pages."
    },
    {
      id: 8,
      question: "Which JavaScript framework is known for its virtual DOM?",
      options: ["Angular", "Vue.js", "React", "Ember.js"],
      correct_answer: 2,
      category: "frontend",
      difficulty: "medium",
      explanation: "React is famous for introducing and popularizing the virtual DOM concept."
    },
    {
      id: 9,
      question: "What is the default port for HTTP?",
      options: ["443", "8080", "80", "3000"],
      correct_answer: 2,
      category: "general",
      difficulty: "easy",
      explanation: "HTTP uses port 80 by default, while HTTPS uses port 443."
    },
    {
      id: 10,
      question: "Which of these is NOT a JavaScript data type?",
      options: ["String", "Boolean", "Float", "Number"],
      correct_answer: 2,
      category: "general",
      difficulty: "medium",
      explanation: "JavaScript doesn't have a 'Float' data type. It uses 'Number' for all numeric values."
    }
  ];

  async getQuestions(): Promise<Question[]> {
    try {
      // If API_BASE_URL is set, make actual API call
      if (API_BASE_URL) {
        const response = await this.api.get<ApiResponse<{ questions: Question[] }>>('/quiz/questions');
        if (response.data.success) {
          return response.data.data.questions;
        }
        throw new Error(response.data.error || 'Failed to fetch questions');
      }

      // Otherwise, return mock data with slight delay to simulate API
      await new Promise(resolve => setTimeout(resolve, 500));
      return this.mockQuestions;
    } catch (error) {
      console.error('Error fetching questions:', error);
      // Fallback to mock data on error
      return this.mockQuestions;
    }
  }

  async submitQuiz(answers: (number | null)[], timeSpent: number): Promise<QuizResult> {
    try {
      // If API_BASE_URL is set, make actual API call
      if (API_BASE_URL) {
        const response = await this.api.post<ApiResponse<QuizResult>>('/quiz/submit', {
          answers,
          timeSpent,
        });

        if (response.data.success) {
          return response.data.data;
        }
        throw new Error(response.data.error || 'Failed to submit quiz');
      }

      // Mock submission logic
      await new Promise(resolve => setTimeout(resolve, 1000));

      const questions = this.mockQuestions;
      let score = 0;
      const detailedResults = answers.map((answer, index) => {
        const question = questions[index];
        const isCorrect = answer === question.correct_answer;
        if (isCorrect) score++;

        return {
          questionId: question.id,
          question: question.question,
          options: question.options,
          userAnswer: answer || 0,
          correctAnswer: question.correct_answer,
          isCorrect,
          explanation: question.explanation,
          category: question.category
        };
      });

      const percentage = Math.round((score / questions.length) * 100);
      const passed = percentage >= 60;

      return {
        score,
        totalQuestions: questions.length,
        percentage,
        passed,
        timeSpent,
        detailedResults
      };
    } catch (error) {
      console.error('Error submitting quiz:', error);
      throw error;
    }
  }
}

const quizAPI = new QuizAPI();
export default quizAPI;
