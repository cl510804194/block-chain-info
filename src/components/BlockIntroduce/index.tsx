import * as React from 'react';
import Dayjs from 'dayjs';
import { Avatar, Skeleton, Box, Stack } from '@mui/material';

import nameIcon from '@/assets/svgs/name_icon.svg';
import { formatTime } from '@/components/BlockDetail';
import { useRawBlock } from '@/context/BlockInfoContext';
import { formatAmount } from '@/utils/number';
import px2vw from '@/utils/px2vw';

function BlockIntroduce() {
  const { data, loading } = useRawBlock();

  return (
    <Box
      sx={[
        { minHeight: '210px', paddingBottom: '10px', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' },
        (theme) => {
          return {
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
              padding: px2vw(10),
            },
          };
        },
      ]}>
      {loading ? (
        <Stack direction="column" spacing={2}>
          <Skeleton variant="circular" height={60} width={60}>
            <Avatar />
          </Skeleton>
          <Skeleton variant="rectangular" width="100%" height={60} />
          <Skeleton variant="rectangular" width="100%" />
          <Skeleton variant="rectangular" width="100%" />
        </Stack>
      ) : (
        <Stack direction="column" sx={{ alignItems: 'flex-start' }}>
          <Box
            sx={[
              { position: 'relative', width: '100px', height: '100px', background: '#eee', borderRadius: '5px' },
              (theme) => {
                return {
                  [theme.breakpoints.down('md')]: {
                    width: px2vw(50),
                    height: px2vw(50),
                  },
                };
              },
            ]}>
            <Box
              component="img"
              src={nameIcon}
              sx={[
                { position: 'absolute', right: '-25px', top: '20px' },
                (theme) => {
                  return {
                    [theme.breakpoints.down('md')]: {
                      width: px2vw(25),
                      height: px2vw(25),
                      right: px2vw(-13),
                      top: px2vw(13),
                    },
                  };
                },
              ]}
            />
          </Box>
          <Box>
            <Box sx={{ fontWeight: 600, fontSize: '24px' }}>Bitcoin Block #{data?.block_index}</Box>
            <Box sx={{ fontSize: 12, color: 'rgb(153, 153, 153)' }}>
              Mined on {Dayjs(data?.time ? data?.time * 1000 : 0).format(formatTime)}
            </Box>
            <Box sx={{ fontSize: 12, color: 'rgb(153, 153, 153)' }}>
              This block was mined on {Dayjs(data?.time ? data?.time * 1000 : 0).format(formatTime)} by --. A total of
              -- BTC $6 -- were sent in the block with the average transaction being -- BTC --.-- earned a total reward
              of -- BTC $ --. The reward consisted of a base reward of -- BTC $ -- with an additional -- BTC -- reward
              paid as fees of the {data?.n_tx ? formatAmount(data?.n_tx) : '--'} transactions which were included in the
              block.
            </Box>
          </Box>
        </Stack>
      )}
    </Box>
  );
}
export default BlockIntroduce;
