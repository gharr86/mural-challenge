import styled from 'styled-components';

import { FILTERS_BAR_HEIGHT_PX } from './Filters';
import type { Note } from '../../api/json-server/types/models';
import NoteItem from '../molecules/NoteItem';

type BoardProps = {
  notes: Note[];
  regionId: string;
  isSorted: boolean;
  mostRecentNoteId: string | null;
};

const Canvas = styled.section<{ $isSorted: boolean }>`
  position: ${(p) => (p.$isSorted ? 'static' : 'relative')};
  width: 100%;
  min-height: calc(100vh - ${FILTERS_BAR_HEIGHT_PX}px);
  display: ${(p) => (p.$isSorted ? 'flex' : 'block')};
  flex-direction: ${(p) => (p.$isSorted ? 'column' : 'row')};
  gap: ${(p) => (p.$isSorted ? '1rem' : '0')};
  padding: ${(p) => (p.$isSorted ? '1rem' : '0')};
  align-items: ${(p) => (p.$isSorted ? 'flex-start' : 'normal')};
`;

function Board({ notes, regionId, isSorted, mostRecentNoteId }: BoardProps) {
  return (
    <Canvas id={regionId} role="region" aria-label="Notes board" tabIndex={-1} $isSorted={isSorted}>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          id={note.id}
          text={note.text}
          x={note.x}
          y={note.y}
          author={note.author}
          color={note.color}
          createdAt={note.createdAt}
          isGridMode={isSorted}
          isHighlighted={note.id === mostRecentNoteId}
        />
      ))}
    </Canvas>
  );
}

export default Board;
