import { renderHook } from '@testing-library/react';
import type { Note } from '../../../api/json-server/types';
import useNotesFilters from '../useNotesFilters';

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

describe('useNotesFilters', () => {
  it('returns empty data when notes are undefined', () => {
    const { result } = renderHook(() =>
      useNotesFilters({
        notes: undefined,
        authorFilter: '',
        colorFilter: '',
      }),
    );

    expect(result.current.filteredNotes).toEqual([]);
    expect(result.current.authorOptions).toEqual([]);
    expect(result.current.colorOptions).toEqual([]);
  });

  it('returns unique sorted author and color options from notes', () => {
    const notes = [
      baseNote({ id: '1', author: 'Zoe', color: 'tokens.green' }),
      baseNote({ id: '2', author: 'Ada', color: 'tokens.red' }),
      baseNote({ id: '3', author: 'Ada', color: 'tokens.red' }),
      baseNote({ id: '4', author: 'Bob', color: 'tokens.orange' }),
    ];

    const { result } = renderHook(() =>
      useNotesFilters({
        notes,
        authorFilter: '',
        colorFilter: '',
      }),
    );

    expect(result.current.authorOptions).toEqual(['Ada', 'Bob', 'Zoe']);
    expect(result.current.colorOptions).toEqual(['tokens.green', 'tokens.orange', 'tokens.red']);
  });

  it('filters by author and color when both filters are set', () => {
    const notes = [
      baseNote({ id: '1', author: 'Ada', color: 'tokens.red' }),
      baseNote({ id: '2', author: 'Ada', color: 'tokens.green' }),
      baseNote({ id: '3', author: 'Bob', color: 'tokens.red' }),
    ];

    const { result } = renderHook(() =>
      useNotesFilters({
        notes,
        authorFilter: 'Ada',
        colorFilter: 'tokens.red',
      }),
    );

    expect(result.current.filteredNotes).toEqual([notes[0]]);
  });

  it('keeps all notes when no filters are selected', () => {
    const notes = [baseNote({ id: '1' }), baseNote({ id: '2', author: 'Bob' })];

    const { result } = renderHook(() =>
      useNotesFilters({
        notes,
        authorFilter: '',
        colorFilter: '',
      }),
    );

    expect(result.current.filteredNotes).toEqual(notes);
  });
});
