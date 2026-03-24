import { BoardPO, FiltersPO, NotesPO } from '../page-objects';

describe('App', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/notes').as('getNotes');
    cy.visit('/');
    cy.wait('@getNotes');
  });

  it('loads all notes on the board', () => {
    BoardPO.assertBoardVisible();
    NotesPO.assertNoteCardCount(3);
    NotesPO.assertNoteWithTextVisible('This is a note');
    NotesPO.assertNoteWithTextVisible('This is also a note');
    NotesPO.assertNoteWithTextVisible('This is another note');
  });

  it('filters notes by author', () => {
    FiltersPO.selectAuthor('john doe');
    NotesPO.assertNoteCardCount(1);
    NotesPO.assertNoteWithTextVisible('This is a note');

    FiltersPO.selectAuthor('');
    NotesPO.assertNoteCardCount(3);
  });

  it('filters notes by color', () => {
    FiltersPO.selectColor('tokens.red');
    NotesPO.assertNoteCardCount(1);
    NotesPO.assertNoteWithTextVisible('This is a note');

    FiltersPO.selectColor('');
    NotesPO.assertNoteCardCount(3);
  });

  it('sorts notes by author ascending', () => {
    FiltersPO.selectSort('author-asc');

    NotesPO.getNoteCards().eq(0).find('h2').should('have.text', 'This is also a note');
    NotesPO.getNoteCards().eq(1).find('h2').should('have.text', 'This is a note');
    NotesPO.getNoteCards().eq(2).find('h2').should('have.text', 'This is another note');
  });

  it('sorts notes by createdAt descending', () => {
    FiltersPO.selectSort('createdAt-desc');

    NotesPO.getNoteCards().eq(0).find('h2').should('have.text', 'This is also a note');
    NotesPO.getNoteCards().eq(1).find('h2').should('have.text', 'This is a note');
    NotesPO.getNoteCards().eq(2).find('h2').should('have.text', 'This is another note');
  });
});
