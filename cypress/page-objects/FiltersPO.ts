import { byTestId } from '../utils/byTestId';

const selectors = {
  author: 'filter-select-author',
  color: 'filter-select-color',
  sort: 'filter-select-sort',
} as const;

function getAuthorSelect() {
  return cy.get(byTestId(selectors.author));
}

function getColorSelect() {
  return cy.get(byTestId(selectors.color));
}

function getSortSelect() {
  return cy.get(byTestId(selectors.sort));
}

function selectAuthor(value: string) {
  getAuthorSelect().select(value);
}

function selectColor(value: string) {
  getColorSelect().select(value);
}

function selectSort(value: string) {
  getSortSelect().select(value);
}

function assertAuthorValue(value: string) {
  getAuthorSelect().should('have.value', value);
}

function assertColorValue(value: string) {
  getColorSelect().should('have.value', value);
}

function assertSortValue(value: string) {
  getSortSelect().should('have.value', value);
}

export const FiltersPO = {
  selectors,
  getAuthorSelect,
  getColorSelect,
  getSortSelect,
  selectAuthor,
  selectColor,
  selectSort,
  assertAuthorValue,
  assertColorValue,
  assertSortValue,
};
