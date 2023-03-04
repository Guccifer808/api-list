import React from 'react';
import { render } from '@testing-library/react';
import ListApi from '../src/components/ListApi';

describe('ListApi', () => {
  const entries = [
    { API: 'API 1', Description: 'Description 1', Auth: 'apiKey' },
    { API: 'API 2', Description: 'Description 2', Auth: 'apiKey' },
  ];
  const response = { count: entries.length, entries: entries };

  it('renders a loading skeleton when loading prop is true', () => {
    const { getAllByTestId } = render(
      <ListApi response={response} loading={true} />
    );
    const skeletons = getAllByTestId('skeleton');
    expect(skeletons).toHaveLength(3);
  });

  it('renders an error message when entries prop is null or undefined', () => {
    const { getByText } = render(<ListApi response={{}} loading={false} />);
    const errorMessage = getByText(/oops/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders a list of ApiCard components when entries prop is provided', () => {
    const { getAllByTestId } = render(
      <ListApi response={response} loading={false} />
    );
    const apiCards = getAllByTestId('api-card');
    expect(apiCards).toHaveLength(entries.length);
  });
});
