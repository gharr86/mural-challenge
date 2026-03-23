import styled from 'styled-components';
import { useNotesQuery } from './api/json-server/api';

const Container = styled.main`
  width: min(720px, 100% - 2rem);
  margin: 3rem auto;
  font-family:
    Inter,
    system-ui,
    -apple-system,
    sans-serif;
`;

const Title = styled.h1`
  margin: 0 0 1rem;
  font-size: 2rem;
`;

const Description = styled.p`
  margin: 0 0 1.5rem;
  color: #6b7280;
`;

const List = styled.ul`
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  background: #fff;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.06);
`;

function App() {
  const { data, isPending, isError, error } = useNotesQuery();

  return (
    <Container>
      <Title>Notes</Title>
      <Description>Simple notes board consuming data from JSON Server.</Description>

      {isPending && <p>Loading notes...</p>}
      {isError && <p>Failed to load notes: {(error as Error).message}</p>}

      {data && (
        <List>
          {data.map((note) => (
            <Item key={note.id}>
              <strong>{note.author}</strong>: {note.text}
            </Item>
          ))}
        </List>
      )}
    </Container>
  );
}

export default App;
