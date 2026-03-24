import { noteQueryKeys, useNotesQuery } from './api';

const jsonServerApi = {
  useNotesQuery,
  noteQueryKeys,
};

export function useJsonServerApi() {
  return jsonServerApi;
}

export { useNotesQuery, noteQueryKeys };
