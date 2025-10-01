import React from 'react';
import { Question } from '../types';

interface QuizQuestionProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  timeLeft: number;
  formatTime: (seconds: number) => string;
  isSubmitting: boolean;
  onSelectAnswer: (answerIndex: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswer,
  timeLeft,
  formatTime,
  isSubmitting,
  onSelectAnswer,
  onNext,
  onPrevious,
  onSubmit
}) => {
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const canProceed = selectedAnswer !== null;
  const timeWarning = timeLeft <= 60; // Warning when 1 minute or less

  return (
    <div className="quiz-question">
      <div className="quiz-container">
        {/* Header with progress and timer */}
        <div className="quiz-header">
          <div className="progress-section">
            <div className="question-counter">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` 
                }}
              />
            </div>
          </div>

          <div className={`timer ${timeWarning ? 'warning' : ''}`}>
            <span className="timer-icon">⏱️</span>
            <span className="timer-text">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Question Card */}
        <div className="question-card">
          <div className="question-header">
            <h2 className="question-text">{question.question}</h2>
            <span className={`category-badge category-${question.category}`}>
              {question.category}
            </span>
          </div>

          <div className="options-container">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedAnswer === index ? 'selected' : ''}`}
                onClick={() => onSelectAnswer(index)}
                disabled={isSubmitting}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="quiz-navigation">
          <button
            className="nav-btn secondary"
            onClick={onPrevious}
            disabled={isFirstQuestion || isSubmitting}
          >
            ← Previous
          </button>

          <div className="nav-center">
            {isSubmitting && (
              <div className="submitting-indicator">
                <div className="spinner"></div>
                <span>Submitting...</span>
              </div>
            )}
          </div>

          {isLastQuestion ? (
            <button
              className="nav-btn primary submit-btn"
              onClick={onSubmit}
              disabled={!canProceed || isSubmitting}
            >
              Submit Quiz
            </button>
          ) : (
            <button
              className="nav-btn primary"
              onClick={onNext}
              disabled={!canProceed || isSubmitting}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
