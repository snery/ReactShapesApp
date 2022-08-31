import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App Shapes={[]} SelectedShape={undefined} Colors={[]} SelectedColors={[]} IsLoading={false} HasError={false} RenderShape={false} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
