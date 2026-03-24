import { byTestId } from '../utils/byTestId';

const selectors = {
  noteCard: 'note-card',
} as const;

function getNoteCards() {
  return cy.get(byTestId(selectors.noteCard));
}

function assertNoteCardCount(expected: number) {
  getNoteCards().should('have.length', expected);
}

function assertNoteWithTextVisible(text: string) {
  getNoteCards().contains(text).should('be.visible');
}

export const NotesPO = {
  selectors,
  getNoteCards,
  assertNoteCardCount,
  assertNoteWithTextVisible,
};
