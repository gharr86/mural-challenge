import styled from 'styled-components';
import type { Note } from '../../api/json-server/types/models';
import NoteItem from '../molecules/NoteItem';
import { FILTERS_BAR_HEIGHT_PX } from './Filters';

type BoardProps = {
  notes: Note[];
  regionId: string;
};

const Canvas = styled.section`
  position: relative;
  width: 100%;
  min-height: calc(100vh - ${FILTERS_BAR_HEIGHT_PX}px);
`;

function Board({ notes, regionId }: BoardProps) {
  return (
    <Canvas id={regionId} role="region" aria-label="Notes board" tabIndex={-1}>
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
        />
      ))}
    </Canvas>
  );
}

export default Board;
