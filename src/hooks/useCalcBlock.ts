import { Transaction } from '@/types';
import { accumulate } from '@/utils';

export const useCalcBlock = (transaction: Transaction[] = []) => {
  const outputs = (transaction || []).reduce((pre, item) => {
    return pre + (item.out || []).length;
  }, 0);
  const inputs = (transaction || []).reduce((pre, item) => {
    return pre + (item.inputs || []).length;
  }, 0);

  const outputValue = (transaction || []).reduce((pre, item) => {
    return pre + accumulate(item.out, 'value');
  }, 0);

  const inputValue = (transaction || []).reduce((pre, item) => {
    const values = (item.inputs || []).reduce((preChild, inputItem) => {
      return preChild + (inputItem?.prev_out?.value || 0);
    }, 0);
    return pre + values;
  }, 0);
  const witnessTx = (transaction || []).reduce((pre, item) => {
    const witnessNumber = (item.inputs || []).reduce((preChild, inputItem) => {
      return preChild + inputItem?.witness?.length > 0 ? 1 : 0;
    }, 0);
    return pre + witnessNumber;
  }, 0);

  const btcAmountTotal = (transaction || []).reduce((pre, item) => {
    const amount = accumulate(item.out, 'value');
    return pre + amount;
  }, 0);

  return {
    outputs,
    inputs,
    outputValue,
    inputValue,
    witnessTx,
    btcAmountTotal,
  };
};
