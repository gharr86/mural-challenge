import { useState } from 'react';
import Main from './components/atoms/Main';
import Board from './components/organisms/Board';
import Filters from './components/organisms/Filters';
import QueryStateNotice from './components/molecules/QueryStateNotice';
import { useNotesQuery } from './api/json-server/api';
import useDomId from './utils/hooks/useDomId';
import useNotesFilters from './utils/hooks/useNotesFilters';

function App() {
  const { data, isPending, isError, error } = useNotesQuery();
  const [authorFilter, setAuthorFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');

  const mainId = useDomId('main');
  const boardRegionId = useDomId('notes-board');
  const { filteredNotes, authorOptions, colorOptions } = useNotesFilters({
    notes: data,
    authorFilter,
    colorFilter,
  });

  return (
    <Main id={mainId} aria-label="Notes">
      {/* First tab stop: keyboard users can jump past chrome to the notes region (see .skip-link in index.css). */}
      <a className="skip-link" href={`#${boardRegionId}`}>
        Skip to notes board
      </a>
      <QueryStateNotice
        isPending={isPending}
        isError={isError}
        errorMessage={(error as Error)?.message ?? ''}
      />

      {data && (
        <>
          <Filters
            authors={authorOptions}
            colors={colorOptions}
            authorValue={authorFilter}
            colorValue={colorFilter}
            onAuthorChange={setAuthorFilter}
            onColorChange={setColorFilter}
            controlledRegionId={boardRegionId}
            resultsCount={filteredNotes.length}
          />
          <Board notes={filteredNotes} regionId={boardRegionId} />
        </>
      )}
    </Main>
  );
}

export default App;
