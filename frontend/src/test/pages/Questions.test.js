// Questions.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../store';  // Update the path to your store
import Questions from './Questions';
import '@testing-library/jest-dom';

// Mocking the Ticket data for test
const mockTickets = [
  {
    _id: '1',
    createdAt: '2025-01-01T10:00:00Z',
    question: '<p>What is React?</p>',
    answer: '<p>React is a JavaScript library for building user interfaces.</p>',
  },
  {
    _id: '2',
    createdAt: '2025-02-01T10:00:00Z',
    question: '<p>What is Redux?</p>',
    answer: '',
  },
];

// Mock useDispatch to simulate actions
jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));

// Mocking the ticketSlice
jest.mock('../features/tickets/ticketSlice', () => ({
  getTickets: jest.fn(),
  reset: jest.fn(),
}));

describe('Questions Component', () => {
  it('renders a list of tickets after data is loaded', async () => {
    // Mocking the state of Redux store
    useSelector.mockImplementationOnce(() => ({
      tickets: mockTickets,
      isLoading: false,
      isSuccess: true,
    }));

    render(
      <Provider store={store}>
        <Router>
          <Questions />
        </Router>
      </Provider>
    );

    // Check that the tickets are rendered
    expect(screen.getByText('What is React?')).toBeInTheDocument();
    expect(screen.getByText('What is Redux?')).toBeInTheDocument();
  });

  it('displays loading spinner when data is loading', () => {
    useSelector.mockImplementationOnce(() => ({
      tickets: [],
      isLoading: true,
      isSuccess: false,
    }));

    render(
      <Provider store={store}>
        <Router>
          <Questions />
        </Router>
      </Provider>
    );

    // Check that the spinner is rendered while loading
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('toggles answer visibility when clicked', async () => {
    useSelector.mockImplementationOnce(() => ({
      tickets: mockTickets,
      isLoading: false,
      isSuccess: true,
    }));

    render(
      <Provider store={store}>
        <Router>
          <Questions />
        </Router>
      </Provider>
    );

    // Find the question and simulate a click to open the answer
    const questionItem = screen.getByText('What is React?');
    fireEvent.click(questionItem);

    // Wait for the answer to be revealed
    await waitFor(() => {
      expect(screen.getByText('React is a JavaScript library for building user interfaces.')).toBeInTheDocument();
    });

    // Check that the toggle icon changes after clicking
    expect(screen.getByTestId('toggle-icon')).toBeInTheDocument();
  });
});
