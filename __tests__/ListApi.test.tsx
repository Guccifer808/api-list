import React from 'react';
import { render, screen, getAllByTestId } from '@testing-library/react';
import ListApi from '../src/components/ListApi';

test('renders a list of ApiCard components when entries prop is provided', () => {
  const entries = [
    {
      api: 'API 1',
      description: 'Description 1',
      auth: 'apiKey',
      cors: '',
      category: '',
      link: '',
    },
    {
      api: 'API 2',
      description: 'Description 2',
      auth: 'apiKey',
      cors: '',
      category: '',
      link: '',
    },
  ];

  const { container } = render(<ListApi response={entries} loading={false} />);

  const apiCards = container.querySelectorAll('[data-testid="api-card"]');
  expect(apiCards).toHaveLength(entries.length);
});
