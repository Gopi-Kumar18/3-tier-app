import { render, screen } from '@testing-library/react';
import App from './App';

// The default CRA boilerplate test checked for a "learn react" link
// that never existed once Routes/Home replaced the CRA starter page —
// it failed on every run. Assert against what Home actually renders.
test('renders the student-teacher portal home page', () => {
  render(<App />);
  expect(screen.getByText(/Welcome to Student-Teacher Portal/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /student/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /teacher/i })).toBeInTheDocument();
});
