import type { Note } from '../../api/json-server/types';
import sortNotesByKey from '../sortNotesByKey';

const baseNote = (overrides: Partial<Note>): Note => ({
  id: 'n1',
  text: 'Hello',
  x: 0,
  y: 0,
  author: 'Ada',
  color: 'tokens.red',
  createdAt: '2026-03-20T12:00:00.000Z',
  ...overrides,
});

describe('sortNotesByKey', () => {
  it('sorts by author ascending', () => {
    const notes = [
      baseNote({ id: '1', author: 'Zoe' }),
      baseNote({ id: '2', author: 'Ada' }),
      baseNote({ id: '3', author: 'Bob' }),
    ];

    const result = sortNotesByKey(notes, 'author', 'asc');

    expect(result.map((note) => note.id)).toEqual(['2', '3', '1']);
  });

  it('sorts by author descending', () => {
    const notes = [
      baseNote({ id: '1', author: 'Zoe' }),
      baseNote({ id: '2', author: 'Ada' }),
      baseNote({ id: '3', author: 'Bob' }),
    ];

    const result = sortNotesByKey(notes, 'author', 'desc');

    expect(result.map((note) => note.id)).toEqual(['1', '3', '2']);
  });

  it('sorts by createdAt ascending', () => {
    const notes = [
      baseNote({ id: '1', createdAt: '2026-03-22T09:30:00.000Z' }),
      baseNote({ id: '2', createdAt: '2026-03-10T09:30:00.000Z' }),
      baseNote({ id: '3', createdAt: '2026-03-20T12:00:00.000Z' }),
    ];

    const result = sortNotesByKey(notes, 'createdAt', 'asc');

    expect(result.map((note) => note.id)).toEqual(['2', '3', '1']);
  });

  it('sorts by createdAt descending', () => {
    const notes = [
      baseNote({ id: '1', createdAt: '2026-03-22T09:30:00.000Z' }),
      baseNote({ id: '2', createdAt: '2026-03-10T09:30:00.000Z' }),
      baseNote({ id: '3', createdAt: '2026-03-20T12:00:00.000Z' }),
    ];

    const result = sortNotesByKey(notes, 'createdAt', 'desc');

    expect(result.map((note) => note.id)).toEqual(['1', '3', '2']);
  });

  it('returns a new array without mutating input', () => {
    const notes = [baseNote({ id: '1', author: 'Zoe' }), baseNote({ id: '2', author: 'Ada' })];
    const originalIds = notes.map((note) => note.id);

    const result = sortNotesByKey(notes, 'author', 'asc');

    expect(result).not.toBe(notes);
    expect(notes.map((note) => note.id)).toEqual(originalIds);
  });

  it('keeps the original order when compared values are equal (stable)', () => {
    const notes = [
      baseNote({ id: '1', author: 'Ada' }),
      baseNote({ id: '2', author: 'Ada' }),
      baseNote({ id: '3', author: 'Ada' }),
    ];

    const result = sortNotesByKey(notes, 'author', 'asc');

    expect(result.map((note) => note.id)).toEqual(['1', '2', '3']);
  });
});
