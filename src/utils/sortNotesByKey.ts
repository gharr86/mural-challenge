import type { Note } from '../api/json-server/types';

export type SortDirection = 'asc' | 'desc';

/**
 * Sorts notes by any key in ascending or descending order.
 * Returns a new array and never mutates the input.
 */
export default function sortNotesByKey(
  notes: Note[],
  key: keyof Note,
  direction: SortDirection,
): Note[] {
  if (notes.length < 2) return [...notes];

  const sortOrder = direction === 'asc' ? 1 : -1;
  const decorated = notes.map((note, index) => {
    if (key === 'createdAt') {
      return { note, index, value: Date.parse(note.createdAt) };
    }

    return { note, index, value: note[key] };
  });

  decorated.sort((a, b) => {
    if (a.value === b.value) {
      return a.index - b.index;
    }

    if (typeof a.value === 'number' && typeof b.value === 'number') {
      return (a.value - b.value) * sortOrder;
    }

    return String(a.value).localeCompare(String(b.value)) * sortOrder;
  });

  return decorated.map((entry) => entry.note);
}
