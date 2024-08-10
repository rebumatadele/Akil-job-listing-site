import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BookmarkComponent from '@/app/bookmark/components/BookmarkComponent';
import { getSession } from 'next-auth/react';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

// Mock the getSession function from next-auth
jest.mock('next-auth/react', () => ({
  getSession: jest.fn(),
}));

describe('BookmarkComponent', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    // Mock session with an accessToken
    (getSession as jest.Mock).mockResolvedValue({
      user: {
        accessToken: 'fake-token', // Use a fake token for testing
      },
    });
  });

  test('renders the component and displays items', async () => {
    // Mock the fetch response to return sample data
    fetchMock.mockResponseOnce(JSON.stringify({
      data: [
        {
          eventID: '1',
          dateBookmarked: '2024-08-01T00:00:00Z',
          datePosted: '2024-07-30T00:00:00Z',
          location: 'New York',
          logoUrl: 'https://example.com/logo.png',
          opType: 'inPerson',
          orgName: 'Sample Org',
          title: 'Sample Event',
        },
      ],
    }));

    render(<BookmarkComponent />);

    // Wait for the items to be displayed
    await waitFor(() => {
      expect(screen.getByText('Sample Event')).toBeInTheDocument();
      expect(screen.getByText('Sample Org')).toBeInTheDocument();
      expect(screen.getByText('New York')).toBeInTheDocument();
      // Match date content
      expect(screen.getByTestId('bookmark-date')).toHaveTextContent('Bookmarked on : Aug 1, 2024');
    });
  });

  test('toggles bookmark state correctly', async () => {
    // Mock the fetch response to return sample data
    fetchMock.mockResponseOnce(JSON.stringify({
      data: [
        {
          eventID: '1',
          dateBookmarked: '2024-08-01T00:00:00Z',
          datePosted: '2024-07-30T00:00:00Z',
          location: 'New York',
          logoUrl: 'https://example.com/logo.png',
          opType: 'inPerson',
          orgName: 'Sample Org',
          title: 'Sample Event',
        },
      ],
    }));

    render(<BookmarkComponent />);

    // Wait for the items to be displayed
    await waitFor(() => screen.getByText('Sample Event'));

    // Mock the delete request
    fetchMock.mockResponseOnce(JSON.stringify({}));

    // Simulate clicking the bookmark icon to toggle it
    const bookmarkIcon = screen.getByTestId('bookmark-icon-1');
    userEvent.click(bookmarkIcon);

    // Simulate clicking the bookmark icon again to toggle off
    userEvent.click(bookmarkIcon);

    // Ensure the item is removed from the list
    await waitFor(() => expect(screen.queryByText('Sample Event')).toBeNull());
  });

  test('handles errors when deleting a bookmark', async () => {
    // Mock the fetch response to return sample data
    fetchMock.mockResponseOnce(JSON.stringify({
      data: [
        {
          eventID: '1',
          dateBookmarked: '2024-08-01T00:00:00Z',
          datePosted: '2024-07-30T00:00:00Z',
          location: 'New York',
          logoUrl: 'https://example.com/logo.png',
          opType: 'inPerson',
          orgName: 'Sample Org',
          title: 'Sample Event',
        },
      ],
    }));

    render(<BookmarkComponent />);

    // Wait for the items to be displayed
    await waitFor(() => screen.getByText('Sample Event'));

    // Mock the delete request to return an error
    fetchMock.mockRejectOnce(new Error('Failed to delete bookmark'));

    // Simulate clicking the delete bookmark icon
    const deleteIcon = screen.getByTestId('bookmark-icon-1');
    userEvent.click(deleteIcon);

    // Ensure the error is logged (this is a placeholder, adjust based on your actual error handling)
    // If your component has visible error handling, add assertions to check that here.
  });
});
