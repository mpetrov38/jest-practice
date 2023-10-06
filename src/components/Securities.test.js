import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor, screen } from '@testing-library/react';
import { makeAPICall } from '../utils/makeApiCall';
import Securities from '../components/Securities';

jest.mock('../utils/makeApiCall');

describe('Securities Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('displays "Loading..." when component is first rendered', () => {
    makeAPICall.mockResolvedValue({});

    render(<Securities />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('fetches and displays data correctly', async () => {
    const mockData = {
      data: {
        items: [
          {
            basic: {
              name: 'Test Security',
            },
            quote: {
              change1DayPercent: 1.23,
            },
          },
        ],
      },
    };

    makeAPICall.mockResolvedValue(mockData);

    render(<Securities />);

    await waitFor(() => {
      expect(screen.getAllByText('Test Security').length).toBe(5);
      expect(screen.getAllByText('1.23%').length).toBe(5);
    });
  });

  it('displays an error message when API call fails', async () => {
    makeAPICall.mockRejectedValue(new Error('API Error'));

    render(<Securities />);

    await waitFor(() => {
      expect(screen.getByText('Error: API Error')).toBeInTheDocument();
    });
  });
});
