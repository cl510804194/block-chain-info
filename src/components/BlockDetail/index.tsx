/**
 *  TODO:
 *  I don't find  formula to calculate some fields,so I use '--' to fill them
 *
 */

import * as React from 'react';
import { Grid, Skeleton } from '@mui/material';
import { useMemo, useState } from 'react';
import { useInterval } from 'react-use';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Dayjs from 'dayjs';

import BlockItem from '@/components/BlockItem';

import { useRawBlock } from '@/context/BlockInfoContext';
import { formatAddress, getDateTime, getLeftTime } from '@/utils';
import { formatAmount, fromTokenDecimals } from '@/utils/number';
import px2vw from '@/utils/px2vw';
import { useCalcBlock } from '@/hooks/useCalcBlock';

const unit = 'BTC';
export const formatTime = 'YYYY年MM月DD日 HH:mm:ss';
function BlockDetails() {
  const { data, loading } = useRawBlock();

  const [overTime, setOverTime] = useState<number>(0);

  const { outputs, inputs, outputValue, inputValue, witnessTx } = useCalcBlock(data?.tx);

  // const amount = accumulate(item.out, 'value');
  useInterval(() => {
    const now = new Date().getTime() / 1000;
    const newOverTime = data?.time ? getLeftTime(now, data?.time) : 0;
    setOverTime(newOverTime);
  }, 1000);

  const overTimeString = useMemo(() => {
    const dateTime = getDateTime(overTime);
    return `${dateTime.d ? `${dateTime.d}d` : ''} ${
      dateTime.h ? `${dateTime.h}h` : ''
    } ${`${dateTime.m}m`} ${`${dateTime.s}s`}`;
  }, [overTime]);

  return (
    <Box
      sx={[
        { height: '545px', paddingTop: '10px' },
        (theme) => {
          return {
            [theme.breakpoints.down('md')]: {
              height: '100%',
              padding: px2vw(10),
            },
          };
        },
      ]}>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height="100%" />
      ) : (
        <Stack direction="column" spacing={1} sx={{ paddingTop: '10px' }}>
          <Box>Details</Box>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
            <Grid item xs={12} md={6}>
              <BlockItem
                label="Hash"
                labelDesc="Unique identifier used to identify a particular block"
                copyInfo={data?.hash}
                value={formatAddress(data?.hash)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem
                label="Size"
                labelDesc="Total size of the block"
                value={`${data?.size ? formatAmount(data?.size) : '--'}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem label="Depth" labelDesc="Total number of confirmations" value="--" />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem
                label="Version"
                labelDesc="Block version related to protocol proposals underway"
                value={` 0x${data?.ver?.toString(16)}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem label="Capacity" value="--" />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem
                label="Merkle Root"
                labelDesc="The root node of a merkle tree, a descendant of all the hashed pairs in the tree"
                copyInfo={data?.mrkl_root}
                value={`${formatAddress(data?.mrkl_root, 2)}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem label="Distance" labelDesc="Time since block was mined" value={overTimeString} />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem
                label="Difficulty"
                labelDesc="Mathematical value of how hard it is to find a valid hash for this block"
                value="--"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem
                label="BTC"
                labelDesc="Accumulative amount of crypto sent on all transactions of the block"
                value="--"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem
                label="Nonce"
                labelDesc="Random value that can be adjusted to satisfy the proof of work"
                value={`${data?.nonce ? formatAmount(data?.nonce) : '--'}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem label="Value" labelDesc="Value of all transactions when block was mined" value="--" />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem
                label="Bits"
                labelDesc="A sub-unit of BTC, equal to 0.000001 BTC"
                value={data?.bits ? formatAmount(data?.bits) : '--'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem label="Value Today" labelDesc="Present value of all transactions" value="--" />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem
                label="Weight"
                labelDesc="A measurement to compare the size of different transactions to each other in proportion to the block size limit"
                value={`${data?.weight ? formatAmount(data?.weight) : '--'} WU`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem label="Average Value" labelDesc="Average value of transaction" value="--" />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem label="Median Time" value={Dayjs(data?.time ? data?.time * 1000 : 0).format(formatTime)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem label="Median Value" labelDesc="Median transaction value" value="--" />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem
                label="Minted"
                labelDesc="Static reward for the miner who calculated the hash for this block"
                value="--"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem
                label="Input Value"
                labelDesc="Sum of all transactional input amounts"
                value={`${inputValue ? fromTokenDecimals(inputValue)?.toFixed(2) : 0} ${unit}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem label="Reward" labelDesc="Reward paid as fees" value="--" />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem
                label="Output Value"
                labelDesc="Sum of all transactional output amounts"
                value={`${outputValue ? fromTokenDecimals(outputValue)?.toFixed(2) : 0} ${unit}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem label="Minted on" value={Dayjs(data?.time ? data?.time * 1000 : 0).format(formatTime)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem
                label="Transactions"
                labelDesc="Number of transactions included in this block"
                value={`${data?.n_tx ? formatAmount(data?.n_tx) : '0'}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem
                label="Height"
                labelDesc="Number of blocks connected on the blockchain"
                value={data?.height ? formatAmount(data?.height) : '0'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem
                label="Witness Tx’s"
                labelDesc="Number of SegWit transactions on the block"
                value={`${formatAmount(witnessTx)}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem label="Inputs" labelDesc="Total amount of inputs" value={`${formatAmount(inputs)}`} />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem label="Confirmations" value="--" />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem label="Outputs" labelDesc="Total amount of outputs" value={`${formatAmount(outputs)}`} />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem label="Miner" value="--" />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem
                label="Fees"
                labelDesc="Amount of transaction fees rewarded to the miner for calculating the hash for this block"
                value={`${data?.fee ? fromTokenDecimals(data?.fee)?.toString() : 0} ${unit}`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem label="CoinBase" value="--" />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem label="Fees Kb" value="--" />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem label="Fees kWU" value="--" />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem label="Fee Range" value="--" />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem label="Average Fee" value="--" />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockItem label="Median Fee" value="--" />
            </Grid>
          </Grid>
        </Stack>
      )}
    </Box>
  );
}
export default BlockDetails;
