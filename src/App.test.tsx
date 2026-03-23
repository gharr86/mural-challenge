import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import '@testing-library/jest-dom';
import App from './App';
import { useNotesQuery } from './api/json-server/api';
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
        {
          id: '1',
          text: 'Buy milk',
          x: 10,
          y: 20,
          author: 'Guillermo',
          color: '#ffeb3b',
          createdAt: '2026-03-20T12:00:00.000Z',
        },
      ],
      isPending: false,
      isError: false,
      error: null,
    } as ReturnType<typeof useNotesQuery>);

    const { getByText } = render(<App />, { wrapper: createWrapper() });

    expect(getByText('Guillermo')).toBeInTheDocument();
    expect(getByText(/Buy milk/)).toBeInTheDocument();
  });
});
