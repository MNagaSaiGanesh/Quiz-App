import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="error-message">
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h2 className="error-title">Something went wrong</h2>
        <p className="error-text">{message}</p>
        {onRetry && (
          <button className="retry-btn" onClick={onRetry}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
