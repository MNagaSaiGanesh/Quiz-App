import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Quiz from '../Quiz';

// Mock the API service
jest.mock('../../services/api', () => ({
  __esModule: true,
  default: {
    getQuestions: jest.fn(() => 
      Promise.resolve([
        {
          id: 1,
          question: "Test question?",
          options: ["Option A", "Option B", "Option C", "Option D"],
          correct_answer: 1,
          category: "test",
          difficulty: "easy",
          explanation: "Test explanation"
        }
      ])
    ),
    submitQuiz: jest.fn(() => 
      Promise.resolve({
        score: 1,
        totalQuestions: 1,
        percentage: 100,
        passed: true,
        timeSpent: 60,
        detailedResults: []
      })
    )
  }
}));

describe('Quiz Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading spinner initially', () => {
    render(<Quiz />);
    expect(screen.getByText(/loading quiz questions/i)).toBeInTheDocument();
  });

  test('renders start page after loading', async () => {
    render(<Quiz />);

    await waitFor(() => {
      expect(screen.getByText(/full-stack development quiz/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/begin quiz/i)).toBeInTheDocument();
  });

  test('starts quiz when begin button is clicked', async () => {
    render(<Quiz />);

    await waitFor(() => {
      expect(screen.getByText(/begin quiz/i)).toBeInTheDocument();
    });

    const beginButton = screen.getByText(/begin quiz/i);
    fireEvent.click(beginButton);

    await waitFor(() => {
      expect(screen.getByText(/question 1 of 1/i)).toBeInTheDocument();
    });
  });

  test('allows answer selection and navigation', async () => {
    render(<Quiz />);

    // Start the quiz
    await waitFor(() => {
      expect(screen.getByText(/begin quiz/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/begin quiz/i));

    await waitFor(() => {
      expect(screen.getByText(/test question/i)).toBeInTheDocument();
    });

    // Select an answer
    const optionB = screen.getByText(/option b/i);
    fireEvent.click(optionB);

    // Check if submit button appears (since it's the only question)
    expect(screen.getByText(/submit quiz/i)).toBeInTheDocument();
  });

  test('shows results after quiz submission', async () => {
    render(<Quiz />);

    // Complete quiz flow
    await waitFor(() => {
      fireEvent.click(screen.getByText(/begin quiz/i));
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText(/option b/i));
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText(/submit quiz/i));
    });

    await waitFor(() => {
      expect(screen.getByText(/quiz complete/i)).toBeInTheDocument();
    });
  });
});
