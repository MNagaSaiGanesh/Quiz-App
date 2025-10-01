import React from 'react';

interface StartPageProps {
  onStart: () => void;
  totalQuestions: number;
}

const StartPage: React.FC<StartPageProps> = ({ onStart, totalQuestions }) => {
  return (
    <div className="start-page">
      <div className="start-container">
        <div className="quiz-header">
          <h1 className="quiz-title">Full-Stack Development Quiz</h1>
          <p className="quiz-description">
            Test your knowledge of full-stack development concepts including React, Node.js, databases, and web technologies.
          </p>
        </div>

        <div className="quiz-info-grid">
          <div className="info-card">
            <div className="info-icon">📝</div>
            <div className="info-content">
              <h3>{totalQuestions} Questions</h3>
              <p>Multiple choice format</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">⏱️</div>
            <div className="info-content">
              <h3>5 Minutes</h3>
              <p>Time limit for completion</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">🎯</div>
            <div className="info-content">
              <h3>60% to Pass</h3>
              <p>Minimum passing score</p>
            </div>
          </div>
        </div>

        <div className="instructions">
          <h3>Instructions:</h3>
          <ul>
            <li>Read each question carefully before selecting your answer</li>
            <li>You can navigate between questions using Previous/Next buttons</li>
            <li>Make sure to answer all questions before submitting</li>
            <li>The quiz will auto-submit when time runs out</li>
            <li>You'll see detailed results after completion</li>
          </ul>
        </div>

        <button className="begin-btn" onClick={onStart}>
          Begin Quiz
        </button>
      </div>
    </div>
  );
};

export default StartPage;
