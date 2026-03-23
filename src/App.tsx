import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'

type Post = {
  id: number
  title: string
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  if (!response.ok) {
    throw new Error('Could not fetch posts')
  }

  return response.json() as Promise<Post[]>
}

const Container = styled.main`
  width: min(720px, 100% - 2rem);
  margin: 3rem auto;
  font-family: Inter, system-ui, -apple-system, sans-serif;
`

const Title = styled.h1`
  margin: 0 0 1rem;
  font-size: 2rem;
`

const Description = styled.p`
  margin: 0 0 1.5rem;
  color: #6b7280;
`

const List = styled.ul`
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
`

const Item = styled.li`
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  background: #fff;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.06);
`

function App() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })

  return (
    <Container>
      <Title>Posts</Title>
      <Description>Simple starter app using React Query and Styled Components.</Description>

      {isPending && <p>Loading posts...</p>}
      {isError && <p>Failed to load: {(error as Error).message}</p>}

      {data && (
        <List>
          {data.map((post) => (
            <Item key={post.id}>{post.title}</Item>
          ))}
        </List>
      )}
    </Container>
  )
}

export default App
