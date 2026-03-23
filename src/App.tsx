import Main from './components/atoms/Main';
import Title from './components/atoms/Title';
import Board from './components/organisms/Board';
import { useNotesQuery } from './api/json-server/api';
import useDomId from './utils/hooks/useDomId';

function App() {
  const { data, isPending, isError, error } = useNotesQuery();
  const mainId = useDomId('main');
  const pageTitleId = useDomId('page-title');
  const boardRegionId = useDomId('notes-board');

  return (
    <Main id={mainId} aria-labelledby={pageTitleId}>
      {/* First tab stop: keyboard users can jump past chrome to the notes region (see .skip-link in index.css). */}
      <a className="skip-link" href={`#${boardRegionId}`}>
        Skip to notes board
      </a>
      <Title id={pageTitleId}>Notes</Title>

      {isPending && (
        <p role="status" aria-live="polite">
          Loading notes...
        </p>
      )}
      {isError && (
        <p role="alert" aria-live="assertive">
          Failed to load notes: {(error as Error).message}
        </p>
      )}

      {data && <Board notes={data} regionId={boardRegionId} />}
    </Main>
  );
}

export default App;
