import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Filters, { FilterProps } from '../src/components/Filters';
import useAxios from '../src/hooks/useAxios';

// Mock useAxios hook to test component without actually making an API call
jest.mock('../src/hooks/useAxios');

const mockedUseAxios = useAxios as jest.MockedFunction<typeof useAxios>;

const categories = ['category1', 'category2', 'category3'];

describe('Filters component', () => {
  const fetchData = jest.fn();
  const filterProps: FilterProps = {
    categories: [],
    response: { entries: [], categories: [] },
    loading: false,
    error: null, // add the error property with a default value of null
    fetchData: jest.fn(),
  };

  beforeEach(() => {
    mockedUseAxios.mockReturnValue({
      fetchData,
      response: { entries: [], categories },
      loading: false,
      error: null,
    });
  });

  it('renders categories', async () => {
    const { getByText } = render(<Filters {...filterProps} />);
    const category1 = getByText('category1');
    const category2 = getByText('category2');
    const category3 = getByText('category3');
    expect(category1).toBeInTheDocument();
    expect(category2).toBeInTheDocument();
    expect(category3).toBeInTheDocument();
  });

  it('loads more categories when load more button is clicked', async () => {
    const { getByRole, container, getByText } = render(
      <Filters {...filterProps} />
    );
    const loadMoreButton = getByRole('button', { name: 'Load More' });

    console.log(container.innerHTML);

    fireEvent.click(loadMoreButton);
    await waitFor(() => {
      expect(getByText('category4')).toBeInTheDocument();
      expect(getByText('category5')).toBeInTheDocument();
    });
  });

  it('hides categories when hide button is clicked', async () => {
    const { getByText, queryByText, getByRole } = render(
      <Filters {...filterProps} />
    );
    const loadMoreButton = getByRole('button', { name: 'Load More' });
    fireEvent.click(loadMoreButton);

    const hideButton = getByText('Hide');
    fireEvent.click(hideButton);

    await waitFor(() => {
      expect(queryByText('category4')).toBeNull();
    });
  });

  it('fetches data when category button is clicked', async () => {
    const { getByText } = render(<Filters {...filterProps} />);
    const category1Button = getByText('category1');
    fireEvent.click(category1Button);
    await waitFor(() => {
      expect(fetchData).toHaveBeenCalledWith({
        params: { category: 'category1' },
      });
    });
  });
});
