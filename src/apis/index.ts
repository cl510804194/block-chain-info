/**
 *   In this test, I use SWR for for Data Fetching
 *   Why？
 *   The data of the blockchain often changes in a short time, and swr supports focus re-request, which is very suitable for this scenario
 */
import { RowBlock } from '@/types';
import axios from 'axios';

const BASE_URL = 'https://blockchain.info';

const instance = axios.create({
  baseURL: BASE_URL,
  //   timeout: 100000,
  //   headers: { 'X-Custom-Header': 'foobar' },
});

instance.interceptors.response.use(
  (response) => {
    return response.data || response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Single Block
 *
 * @export
 * @param {*} { blockHash }
 * @return {*}
 */

export async function getRawBlock({ blockHash }: { blockHash: string }): Promise<any> {
  const data: RowBlock = await instance.get(`/rawblock/${blockHash}`);
  return data;
}
