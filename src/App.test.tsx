import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, within } from '@testing-library/react';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import '@testing-library/jest-dom';
import App from './App';
import { useNotesQuery } from './api/json-server/api';
import createMockNote from './test/mocks/notes';
import { theme } from './theme';

jest.mock('./api/json-server/api', () => ({
  useNotesQuery: jest.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

describe('App', () => {
  it('renders fetched notes', async () => {
    const mockedUseNotesQuery = jest.mocked(useNotesQuery);
    mockedUseNotesQuery.mockReturnValue({
      data: [
        createMockNote({
          id: '1',
          text: 'My note',
          x: 10,
          y: 20,
          author: 'Johnny Doe',
          color: '#ffeb3b',
        }),
      ],
      isPending: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useNotesQuery>);

    const { getByRole } = render(<App />, { wrapper: createWrapper() });

    const board = getByRole('region', { name: 'Notes board' });
    expect(within(board).getByText('Johnny Doe')).toBeInTheDocument();
    expect(within(board).getByText(/My note/)).toBeInTheDocument();
  });
});
