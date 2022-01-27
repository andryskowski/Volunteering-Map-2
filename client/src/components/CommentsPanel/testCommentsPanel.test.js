import React from 'react';
import {
  render, fireEvent, screen, waitFor, 
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CommentsPanel from './CommentsPanel';

test('renders component', async () => {
  const { getByText } = render(<CommentsPanel />);
  expect(getByText('Panel komentarzy')).toBeInTheDocument();
});

test('comments render properly', async () => {
  const { getByText } = render(<CommentsPanel />);
  const textNode = await waitFor(() => getByText('commentId: 61c9d67b8a62caf51a57c42d'));

  expect(textNode).toBeInTheDocument(); 
});

test('comments not render properly', async () => {
  jest.spyOn(global, 'fetch').mockImplementation((() => Promise.resolve({
    json: () => Promise.resolve({ error: 'sth went wrong' }),
  })));
  const { getByText } = render(<CommentsPanel />);
  const textNode = await waitFor(() => getByText('Error: cannot connect to Comments.'));
  expect(textNode).toBeInTheDocument(); 
}, []);
