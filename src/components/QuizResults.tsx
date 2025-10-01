import React from 'react';
import { QuizResult } from '../types';

interface QuizResultsProps {
  result: QuizResult;
  onRestart: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ result, onRestart }) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (percentage: number): string => {
    if (percentage >= 80) return 'excellent';
    if (percentage >= 60) return 'good';
    if (percentage >= 40) return 'fair';
    return 'poor';
  };

  const getGradeMessage = (percentage: number): string => {
    if (percentage >= 90) return 'Outstanding! 🏆';
    if (percentage >= 80) return 'Excellent work! 🌟';
    if (percentage >= 70) return 'Great job! 👏';
    if (percentage >= 60) return 'Good effort! 👍';
    if (percentage >= 50) return 'Keep practicing! 📚';
    return 'More study needed! 💪';
  };

  const correctAnswers = result.detailedResults.filter(r => r.isCorrect).length;

  return (
    <div className="quiz-results">
      <div className="results-container">
        <div className="results-header">
          <div className={`score-circle ${getScoreColor(result.percentage)}`}>
            <div className="score-percentage">{result.percentage}%</div>
            <div className="score-fraction">
              {correctAnswers}/{result.totalQuestions}
            </div>
          </div>

          <div className="result-summary">
            <h1 className="result-title">Quiz Complete!</h1>
            <p className="result-message">{getGradeMessage(result.percentage)}</p>
            <div className={`pass-status ${result.passed ? 'passed' : 'failed'}`}>
              {result.passed ? '✅ Passed' : '❌ Failed'}
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-icon">📊</div>
            <div className="stat-details">
              <div className="stat-value">{correctAnswers}/{result.totalQuestions}</div>
              <div className="stat-label">Correct Answers</div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">⏱️</div>
            <div className="stat-details">
              <div className="stat-value">{formatTime(result.timeSpent)}</div>
              <div className="stat-label">Time Taken</div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">🎯</div>
            <div className="stat-details">
              <div className="stat-value">{result.percentage}%</div>
              <div className="stat-label">Accuracy</div>
            </div>
          </div>
        </div>

        <div className="detailed-results">
          <h3>Question Review</h3>
          <div className="questions-review">
            {result.detailedResults.map((detail, index) => (
              <div 
                key={detail.questionId} 
                className={`question-review ${detail.isCorrect ? 'correct' : 'incorrect'}`}
              >
                <div className="question-review-header">
                  <span className="question-number">Q{index + 1}</span>
                  <span className={`result-icon ${detail.isCorrect ? 'correct' : 'incorrect'}`}>
                    {detail.isCorrect ? '✅' : '❌'}
                  </span>
                </div>

                <div className="question-review-content">
                  <p className="review-question">{detail.question}</p>

                  <div className="answer-comparison">
                    <div className="user-answer">
                      <span className="answer-label">Your answer:</span>
                      <span className={`answer-text ${detail.isCorrect ? 'correct' : 'incorrect'}`}>
                        {String.fromCharCode(65 + detail.userAnswer)} - {detail.options[detail.userAnswer]}
                      </span>
                    </div>

                    {!detail.isCorrect && (
                      <div className="correct-answer">
                        <span className="answer-label">Correct answer:</span>
                        <span className="answer-text correct">
                          {String.fromCharCode(65 + detail.correctAnswer)} - {detail.options[detail.correctAnswer]}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="explanation">
                    <strong>Explanation:</strong> {detail.explanation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="results-actions">
          <button className="restart-btn" onClick={onRestart}>
            <span className="btn-icon">🔄</span>
            Take Quiz Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
