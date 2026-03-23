import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { Note } from './types/index';

const API_BASE_URL = import.meta.env.VITE_JSON_SERVER_URL ?? 'http://localhost:3000';
const NOTES_PATH = '/notes';

export const noteQueryKeys = {
  all: ['notes'] as const,
};

const buildUrl = (path: string) => `${API_BASE_URL}${path}`;

const throwIfNotOk = async (response: Response): Promise<void> => {
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Request failed with status ${response.status}`);
  }
};

const fetchNotes = async (): Promise<Note[]> => {
  const response = await fetch(buildUrl(NOTES_PATH));
  await throwIfNotOk(response);
  return response.json() as Promise<Note[]>;
};

export const useNotesQuery = (): UseQueryResult<Note[], Error> =>
  useQuery({
    queryKey: noteQueryKeys.all,
    queryFn: fetchNotes,
  });
