import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import ApiCard from '../src/components/ApiCard';

describe('ApiCard', () => {
  const api = {
    API: 'Test API',
    Category: 'Test Category',
    Description: 'Test Description',
    Auth: 'Test Auth',
    Cors: 'Test Cors',
    Link: 'http://testlink.com',
  };

  test('renders API information', () => {
    const { getByText, getAllByText } = render(<ApiCard api={api} />);
    expect(getByText(/Name/).textContent).toContain(`Name: ${api.API}`);

    expect(getAllByText(/Category/)[0].textContent).toContain(
      `Category: ${api.Category}`
    );
    expect(getAllByText(/Description/)[0].textContent).toContain(
      `Description: ${api.Description}`
    );
    expect(getAllByText(/Auth/)[0].textContent).toContain(`Auth: ${api.Auth}`);
    expect(getAllByText(/Cors/)[0].textContent).toContain(`Cors: ${api.Cors}`);
  });

  test('renders link to API', () => {
    const { getByRole } = render(<ApiCard api={api} />);
    const linkElement = getByRole('link');
    expect(linkElement.getAttribute('href')).toBe(api.Link);
    expect(linkElement.getAttribute('target')).toBe('_blank');
    expect(linkElement.getAttribute('rel')).toBe('noopener noreferrer');
  });
});
