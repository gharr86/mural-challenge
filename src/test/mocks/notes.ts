import type { Note } from '../../api/json-server/types';

export default function createMockNote(overrides: Partial<Note> = {}): Note {
  return {
    id: 'n1',
    text: 'Hello',
    x: 0,
    y: 0,
    author: 'Ada',
    color: 'tokens.red',
    createdAt: '2026-03-20T12:00:00.000Z',
    ...overrides,
  };
}
