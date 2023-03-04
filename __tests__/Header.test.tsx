import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header, { FetchDataOptions } from '../src/components/Header';

describe('Header component', () => {
  const mockFetchData = jest.fn((params: { params: { title: string } }) =>
    Promise.resolve()
  );

  it('renders the component', () => {
    render(
      <Header fetchData={mockFetchData} params={{ title: '' }} title='' />
    );
    const headerElement = screen.getByText(/Search for public APIs/i);
    expect(headerElement).toBeInTheDocument();
  });

  it('calls fetchData on search button click', () => {
    const searchTitle = 'test';
    render(
      <Header fetchData={mockFetchData} params={{ title: '' }} title='' />
    );
    const searchInput = screen.getByPlaceholderText(
      /Find your API/i
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: searchTitle } });
    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);
    const expectedParams: FetchDataOptions['params'] = { title: searchTitle };
    expect(mockFetchData).toHaveBeenCalledWith({
      params: expectedParams,
      title: '',
    });
  });

  it('calls fetchData on enter key press', () => {
    const searchTitle = 'test';
    render(
      <Header fetchData={mockFetchData} params={{ title: '' }} title='' />
    );
    const searchInput = screen.getByPlaceholderText(
      /Find your API/i
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: searchTitle } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    const expectedParams: FetchDataOptions['params'] = { title: searchTitle };
    expect(mockFetchData).toHaveBeenCalledWith({
      params: expectedParams,
      title: '',
    });
  });
});
