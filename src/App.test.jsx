import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders footer', () => {
  render(<App />);
  const linkElement = screen.getByText(/Bookkers hecha por: Paula Torres, Matías Fernández y Marjorie Bascuñán./i);
  expect(linkElement).toBeInTheDocument();
});

test('renders header', () => {
  render(<App />);
  const linkElement = screen.getByText(/📚Bookkers/i);
  expect(linkElement).toBeInTheDocument();
});
