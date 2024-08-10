import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Bookmark from '@/app/bookmark/components/Bookmark';
import BookmarkComponent from '@/app/bookmark/components/BookmarkComponent'; // Import BookmarkComponent
import { getSession } from 'next-auth/react';
import fetchMock from 'jest-fetch-mock';
import userEvent from '@testing-library/user-event'; // Import userEvent

fetchMock.enableMocks();

jest.mock('next-auth/react', () => ({
  getSession: jest.fn(),
}));

describe('Bookmark Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    (getSession as jest.Mock).mockResolvedValue({
      user: {
        accessToken: 'fake-token',
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

    render(<BookmarkComponent />); // Use BookmarkComponent

    // Wait for the items to be displayed
    await waitFor(() => screen.getByText('Sample Event'));

    // Mock the delete request
    fetchMock.mockResponseOnce(JSON.stringify({}));

    // Simulate clicking the bookmark icon to toggle it
    const bookmarkIcon = screen.getByTestId('bookmark-icon-1');
    userEvent.click(bookmarkIcon);

    // Ensure the item is removed from the list
    await waitFor(() => expect(screen.queryByText('Sample Event')).toBeNull());
  });

  test('handles errors when fetching bookmarks', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch bookmarks'));

    render(<Bookmark />);

    await waitFor(() => {
      expect(screen.getByTestId('title')).toBeInTheDocument();
      expect(screen.getByTestId('bookmark-count')).toHaveTextContent('0 Bookmarks');
    });
  });
});
