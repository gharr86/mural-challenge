import createMockNote from '../../test/mocks/notes';
import filterNotesByKey from '../filterNotesByKey';

describe('filterNotesByKey', () => {
  it('returns an empty array when given no notes', () => {
    expect(filterNotesByKey([], 'author', 'Ada')).toEqual([]);
  });

  it('returns only notes whose field equals the value', () => {
    const notes = [
      createMockNote({ id: 'a', author: 'Ada' }),
      createMockNote({ id: 'b', author: 'Bob' }),
      createMockNote({ id: 'c', author: 'Ada' }),
    ];

    expect(filterNotesByKey(notes, 'author', 'Ada')).toEqual([notes[0], notes[2]]);
  });

  it('returns an empty array when nothing matches', () => {
    const notes = [createMockNote({ author: 'Ada' })];

    expect(filterNotesByKey(notes, 'author', 'Zoe')).toEqual([]);
  });

  it('matches on any key converted to string', () => {
    const notes = [
      createMockNote({ id: '1', color: 'red' }),
      createMockNote({ id: '2', color: 'blue' }),
    ];

    expect(filterNotesByKey(notes, 'color', 'blue')).toEqual([notes[1]]);
    expect(filterNotesByKey(notes, 'id', '1')).toEqual([notes[0]]);
    expect(filterNotesByKey(notes, 'x', '0')).toHaveLength(2);
  });

  it('does not mutate the input array', () => {
    const notes = [createMockNote({})];
    const copy = [...notes];

    filterNotesByKey(notes, 'author', 'Ada');

    expect(notes).toEqual(copy);
  });
});
