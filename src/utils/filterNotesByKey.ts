import type { Note } from '../api/json-server/types';

/**
 * Takes notes, any field name, and a value to match.
 * Returns notes where `String(note[key])` equals `value`.
 */
export default function filterNotesByKey(notes: Note[], key: string, value: string): Note[] {
  return notes.filter((note) => String((note as Record<string, unknown>)[key] ?? '') === value);
}
