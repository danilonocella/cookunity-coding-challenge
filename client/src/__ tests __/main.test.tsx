import { render } from '@testing-library/react';
import { router } from '../main'; // Updated import path
import { RouterProvider } from 'react-router-dom'; // Import RouterProvider from react-router-dom
import { theme } from '../main'; // Updated import path
import { CardsProvider } from '../context/CardsContext'; // Updated import path
import { ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider from @mui/material/styles
import '@testing-library/jest-dom'; // Ensure jest-dom assertions are available

// Mock dependencies
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn().mockImplementation((_element) => ({
    render: jest.fn(),
  })),
}));

jest.mock('../main.css', () => ({}));

describe('Main App Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <CardsProvider>
          <RouterProvider router={router} />
        </CardsProvider>
      </ThemeProvider>
    );

    expect(container).toBeInTheDocument(); // Ensure the container is rendered properly
  });
});