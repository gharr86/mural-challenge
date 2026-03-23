import styled from 'styled-components';
import type { Note } from '../../api/json-server/types/models';
import NoteItem from '../molecules/NoteItem';

type BoardProps = {
  notes: Note[];
};

const Canvas = styled.section`
  position: relative;
  min-height: 70vh;
`;

function Board({ notes }: BoardProps) {
  return (
    <Canvas>
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
