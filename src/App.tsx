import { useState } from 'react';

import { useJsonServerApi } from './api/json-server';
import Main from './components/atoms/Main';
import QueryStateNotice from './components/molecules/QueryStateNotice';
import Board from './components/organisms/Board';
import Filters from './components/organisms/Filters';
import useDomId from './utils/hooks/useDomId';
import useNotesFilters from './utils/hooks/useNotesFilters';

function App() {
  const { useNotesQuery } = useJsonServerApi();
  const { data, isPending, isError, error } = useNotesQuery();
  const [authorFilter, setAuthorFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [sortValue, setSortValue] = useState('');

  const mainId = useDomId('main');
  const boardRegionId = useDomId('notes-board');
  const { filteredNotes, authorOptions, colorOptions, mostRecentNoteId } = useNotesFilters({
    notes: data,
    authorFilter,
    colorFilter,
    sortValue,
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
            sortValue={sortValue}
            onAuthorChange={setAuthorFilter}
            onColorChange={setColorFilter}
            onSortChange={setSortValue}
            controlledRegionId={boardRegionId}
            resultsCount={filteredNotes.length}
          />
          <Board
            notes={filteredNotes}
            regionId={boardRegionId}
            isSorted={Boolean(sortValue)}
            mostRecentNoteId={mostRecentNoteId}
          />
        </>
      )}
    </Main>
  );
}

export default App;
