import '@testing-library/jest-dom';
import { resetNanoidMock } from './test/mocks/nanoid';

beforeEach(() => {
  resetNanoidMock();
});
