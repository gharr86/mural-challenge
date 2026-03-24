import { byTestId } from '../utils/byTestId';

const selectors = {
  board: 'notes-board',
} as const;

function getBoard() {
  return cy.get(byTestId(selectors.board));
}

function assertBoardVisible() {
  getBoard().should('be.visible');
}

export const BoardPO = {
  selectors,
  getBoard,
  assertBoardVisible,
};
