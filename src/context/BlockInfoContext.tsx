import { createContext, useContext } from 'react';

import type { RowBlock } from '@/types';

export interface RawBlockContextValues {
  data?: RowBlock;
  loading?: boolean;
}

const defaultValue = {
  data: undefined,
  loading: true,
};
export const RawBlockContext = createContext<RawBlockContextValues>(defaultValue);

export const useRawBlock = () => useContext(RawBlockContext);
