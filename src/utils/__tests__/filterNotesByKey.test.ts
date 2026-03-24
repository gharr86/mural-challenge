import type { Note } from '../../api/json-server/types';
import filterNotesByKey from '../filterNotesByKey';

const baseNote = (overrides: Partial<Note>): Note => ({
  id: 'n1',
  text: 'Hello',
  x: 0,
  y: 0,
  author: 'Ada',
  color: 'yellow',
  createdAt: '2026-03-20T12:00:00.000Z',
  ...overrides,
});

describe('filterNotesByKey', () => {
  it('returns an empty array when given no notes', () => {
    expect(filterNotesByKey([], 'author', 'Ada')).toEqual([]);
  });

  it('returns only notes whose field equals the value', () => {
    const notes = [
      baseNote({ id: 'a', author: 'Ada' }),
      baseNote({ id: 'b', author: 'Bob' }),
      baseNote({ id: 'c', author: 'Ada' }),
    ];

    expect(filterNotesByKey(notes, 'author', 'Ada')).toEqual([notes[0], notes[2]]);
  });

  it('returns an empty array when nothing matches', () => {
    const notes = [baseNote({ author: 'Ada' })];

    expect(filterNotesByKey(notes, 'author', 'Zoe')).toEqual([]);
  });

  it('matches on any key converted to string', () => {
    const notes = [baseNote({ id: '1', color: 'red' }), baseNote({ id: '2', color: 'blue' })];

    expect(filterNotesByKey(notes, 'color', 'blue')).toEqual([notes[1]]);
    expect(filterNotesByKey(notes, 'id', '1')).toEqual([notes[0]]);
    expect(filterNotesByKey(notes, 'x', '0')).toHaveLength(2);
  });

  it('does not mutate the input array', () => {
    const notes = [baseNote({})];
    const copy = [...notes];

    filterNotesByKey(notes, 'author', 'Ada');

    expect(notes).toEqual(copy);
  });
});
