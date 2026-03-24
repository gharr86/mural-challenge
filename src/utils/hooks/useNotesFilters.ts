import { useMemo } from 'react';
import type { Note } from '../../api/json-server/types';
import filterNotesByKey from '../filterNotesByKey';

type UseNotesFiltersParams = {
  notes: Note[] | undefined;
  authorFilter: string;
  colorFilter: string;
};

type UseNotesFiltersResult = {
  filteredNotes: Note[];
  authorOptions: string[];
  colorOptions: string[];
};

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

export default function useNotesFilters({
  notes,
  authorFilter,
  colorFilter,
}: UseNotesFiltersParams): UseNotesFiltersResult {
  const filteredNotes = useMemo(() => {
    if (!notes) return [];

    let result = notes;

    if (authorFilter) result = filterNotesByKey(result, 'author', authorFilter);
    if (colorFilter) result = filterNotesByKey(result, 'color', colorFilter);

    return result;
  }, [notes, authorFilter, colorFilter]);

  const authorOptions = useMemo(() => uniqueSorted(notes?.map((n) => n.author) ?? []), [notes]);
  const colorOptions = useMemo(() => uniqueSorted(notes?.map((n) => n.color) ?? []), [notes]);

  return {
    filteredNotes,
    authorOptions,
    colorOptions,
  };
}
