import { useMemo } from 'react';
import type { Note } from '../../api/json-server/types';
import filterNotesByKey from '../filterNotesByKey';
import sortNotesByKey, { type SortDirection } from '../sortNotesByKey';

type UseNotesFiltersParams = {
  notes: Note[] | undefined;
  authorFilter: string;
  colorFilter: string;
  sortValue: string;
};

type UseNotesFiltersResult = {
  filteredNotes: Note[];
  authorOptions: string[];
  colorOptions: string[];
  mostRecentNoteId: string | null;
};

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

export default function useNotesFilters({
  notes,
  authorFilter,
  colorFilter,
  sortValue,
}: UseNotesFiltersParams): UseNotesFiltersResult {
  const filteredNotes = useMemo(() => {
    if (!notes) return [];

    let result = notes;

    if (authorFilter) result = filterNotesByKey(result, 'author', authorFilter);
    if (colorFilter) result = filterNotesByKey(result, 'color', colorFilter);
    if (sortValue) {
      const [sortKey, sortDirection] = sortValue.split('-') as [keyof Note, SortDirection];
      result = sortNotesByKey(result, sortKey, sortDirection);
    }

    return result;
  }, [notes, authorFilter, colorFilter, sortValue]);

  const authorOptions = useMemo(() => uniqueSorted(notes?.map((n) => n.author) ?? []), [notes]);
  const colorOptions = useMemo(() => uniqueSorted(notes?.map((n) => n.color) ?? []), [notes]);
  const mostRecentNoteId = useMemo(() => {
    if (filteredNotes.length === 0) return null;

    return filteredNotes.reduce((latest, current) =>
      Date.parse(current.createdAt) > Date.parse(latest.createdAt) ? current : latest,
    ).id;
  }, [filteredNotes]);

  return {
    filteredNotes,
    authorOptions,
    colorOptions,
    mostRecentNoteId,
  };
}
