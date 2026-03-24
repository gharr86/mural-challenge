import { nanoid } from 'nanoid';
import { useMemo } from 'react';

function useDomId(prefix: string): string {
  return useMemo(() => `${prefix}-${nanoid()}`, [prefix]);
}

export default useDomId;
