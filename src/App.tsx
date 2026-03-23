import Main from './components/atoms/Main';
import Title from './components/atoms/Title';
import Board from './components/organisms/Board';
import { useNotesQuery } from './api/json-server/api';

function App() {
  const { data, isPending, isError, error } = useNotesQuery();

  return (
    <Main>
      <Title>Notes</Title>

      {isPending && <p>Loading notes...</p>}
      {isError && <p>Failed to load notes: {(error as Error).message}</p>}

      {data && <Board notes={data} />}
    </Main>
  );
}

export default App;
