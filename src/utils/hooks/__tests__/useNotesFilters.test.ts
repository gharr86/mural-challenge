import { renderHook } from '@testing-library/react';
import createMockNote from '../../../test/mocks/notes';
import useNotesFilters from '../useNotesFilters';

describe('useNotesFilters', () => {
  it('returns empty data when notes are undefined', () => {
    const { result } = renderHook(() =>
      useNotesFilters({
        notes: undefined,
        authorFilter: '',
        colorFilter: '',
        sortValue: '',
      }),
    );

    expect(result.current.filteredNotes).toEqual([]);
    expect(result.current.authorOptions).toEqual([]);
    expect(result.current.colorOptions).toEqual([]);
    expect(result.current.mostRecentNoteId).toBeNull();
  });

  it('returns unique sorted author and color options from notes', () => {
    const notes = [
      createMockNote({ id: '1', author: 'Zoe', color: 'tokens.green' }),
      createMockNote({ id: '2', author: 'Ada', color: 'tokens.red' }),
      createMockNote({ id: '3', author: 'Ada', color: 'tokens.red' }),
      createMockNote({ id: '4', author: 'Bob', color: 'tokens.orange' }),
    ];

    const { result } = renderHook(() =>
      useNotesFilters({
        notes,
        authorFilter: '',
        colorFilter: '',
        sortValue: '',
      }),
    );

    expect(result.current.authorOptions).toEqual(['Ada', 'Bob', 'Zoe']);
    expect(result.current.colorOptions).toEqual(['tokens.green', 'tokens.orange', 'tokens.red']);
  });

  it('filters by author and color when both filters are set', () => {
    const notes = [
      createMockNote({ id: '1', author: 'Ada', color: 'tokens.red' }),
      createMockNote({ id: '2', author: 'Ada', color: 'tokens.green' }),
      createMockNote({ id: '3', author: 'Bob', color: 'tokens.red' }),
    ];

    const { result } = renderHook(() =>
      useNotesFilters({
        notes,
        authorFilter: 'Ada',
        colorFilter: 'tokens.red',
        sortValue: '',
      }),
    );

    expect(result.current.filteredNotes).toEqual([notes[0]]);
  });

  it('keeps all notes when no filters are selected', () => {
    const notes = [createMockNote({ id: '1' }), createMockNote({ id: '2', author: 'Bob' })];

    const { result } = renderHook(() =>
      useNotesFilters({
        notes,
        authorFilter: '',
        colorFilter: '',
        sortValue: '',
      }),
    );

    expect(result.current.filteredNotes).toEqual(notes);
  });

  it('applies sorting when sortValue is selected', () => {
    const notes = [
      createMockNote({ id: '1', author: 'Zoe' }),
      createMockNote({ id: '2', author: 'Ada' }),
      createMockNote({ id: '3', author: 'Bob' }),
    ];

    const { result } = renderHook(() =>
      useNotesFilters({
        notes,
        authorFilter: '',
        colorFilter: '',
        sortValue: 'author-asc',
      }),
    );

    expect(result.current.filteredNotes.map((note) => note.id)).toEqual(['2', '3', '1']);
  });

  it('returns the id of the most recent note in current results', () => {
    const notes = [
      createMockNote({ id: '1', createdAt: '2026-03-10T09:30:00.000Z' }),
      createMockNote({ id: '2', createdAt: '2026-03-22T09:30:00.000Z' }),
      createMockNote({ id: '3', createdAt: '2026-03-20T12:00:00.000Z' }),
    ];

    const { result } = renderHook(() =>
      useNotesFilters({
        notes,
        authorFilter: '',
        colorFilter: '',
        sortValue: '',
      }),
    );

    expect(result.current.mostRecentNoteId).toBe('2');
  });
});
