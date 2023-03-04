import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header, { FetchDataOptions } from '../src/components/Header';

describe('Header component', () => {
  const mockFetchData = jest.fn();
  const options: FetchDataOptions = {
    params: {
      title: '',
    },
    title: 'Search for public APIs',
    fetchData: mockFetchData,
  };

  beforeEach(() => {
    render(<Header {...options} />);
  });

  it('should render the component', () => {
    expect(screen.getByText(options.title)).toBeInTheDocument();
  });

  it('should call fetchData when enter key is pressed in the input field', () => {
    const input = screen.getByPlaceholderText('Find your API');
    const searchValue = 'test';
    fireEvent.change(input, { target: { value: searchValue } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockFetchData).toHaveBeenCalledWith({
      params: { title: searchValue },
    });
  });

  it('should call fetchData when button is clicked', () => {
    const input = screen.getByPlaceholderText('Find your API');
    const searchValue = 'test';
    fireEvent.change(input, { target: { value: searchValue } });
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockFetchData).toHaveBeenCalledWith({
      params: { title: searchValue },
    });
  });
});
