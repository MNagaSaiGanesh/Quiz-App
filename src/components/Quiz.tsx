import React from 'react';
import { useQuiz } from '../hooks/useQuiz';
import StartPage from './StartPage';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const Quiz: React.FC = () => {
  const {
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
  } = useQuiz(300); // 5 minutes

  if (loading) {
    return <LoadingSpinner message="Loading quiz questions..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  }

  if (quizState.isCompleted && result) {
    return <QuizResults result={result} onRestart={restartQuiz} />;
  }

  if (!quizState.isStarted) {
    return <StartPage onStart={startQuiz} totalQuestions={questions.length} />;
  }

  if (questions.length === 0) {
    return <LoadingSpinner message="Preparing your quiz..." />;
  }

  const currentQuestion = questions[quizState.currentQuestion];

  return (
    <QuizQuestion
      question={currentQuestion}
      currentQuestionIndex={quizState.currentQuestion}
      totalQuestions={questions.length}
      selectedAnswer={quizState.selectedAnswers[quizState.currentQuestion]}
      timeLeft={quizState.timeLeft}
      formatTime={formatTime}
      isSubmitting={quizState.isSubmitting}
      onSelectAnswer={selectAnswer}
      onNext={nextQuestion}
      onPrevious={previousQuestion}
      onSubmit={handleSubmit}
    />
  );
};

export default Quiz;
