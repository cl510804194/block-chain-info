export interface Transaction {
  time: number;
  index: number;
  txid: string;
  size: number;
  version: number;
  locktime: number;
  fee: number;
  hash: string;
  inputs: {
    addr: string;
    prev_out: any;
    coinbase: boolean;
    txid: string;
    output: number;
    sigscript: string;
    script: string;
    sequence: number;
    pkscript: string;
    value: number;
    address: string;
    witness: string[];
  }[];
  out: {
    addr: string;
    address: string;
    pkscript: string;
    script: string;
    value: number;
    spent: boolean;
    spender: {
      txid: string;
      input: number;
    };
  }[];
}

export interface RowBlock {
  bits: number;
  block_index: number;
  fee: number;
  hash: string;
  height: number;
  main_chain: boolean;
  mrkl_root: string;
  n_tx: number;
  next_block: string[];
  nonce: number;
  prev_block: string;
  size: number;
  time: number;
  tx: Transaction[];
  ver: number;
  weight: number;
}
