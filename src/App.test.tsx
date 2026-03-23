import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import App from './App'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('App', () => {
  it('renders fetched posts', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: 'First post' }],
    } as Response)
    globalThis.fetch = fetchMock as unknown as typeof fetch

    render(<App />, { wrapper: createWrapper() })

    expect(screen.getByText('Loading posts...')).toBeInTheDocument()
    expect(await screen.findByText('First post')).toBeInTheDocument()
  })
})
