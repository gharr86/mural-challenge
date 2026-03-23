import styled from 'styled-components';
import type { Note } from '../../api/json-server/types/models';
import NoteItem from '../molecules/NoteItem';

type BoardProps = {
  notes: Note[];
  regionId: string;
};

const Canvas = styled.section`
  position: relative;
  min-height: 70vh;
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
