import { useMemo } from 'react';
import { nanoid } from 'nanoid';

function useDomId(prefix: string): string {
  return useMemo(() => `${prefix}-${nanoid()}`, [prefix]);
}

export default useDomId;
