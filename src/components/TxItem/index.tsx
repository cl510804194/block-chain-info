import React, { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { Box, Stack } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import numbro from 'numbro';
import Dayjs from 'dayjs';
import { toast } from 'react-toastify';

import config from '@/config';
import { accumulate, formatAddress } from '@/utils';
import { fromTokenDecimals } from '@/utils/number';

import { buttonHover } from '@/utils/style';

import type { Transaction } from '@/types';

export interface TxItemProps {
  data: Transaction;
}

export interface InfoItemProps {
  index?: number;
  addr?: string;
  value?: number;
  script?: string;

  [key: string]: any;
}

const border = '1px solid rgb(238, 238, 238)';

export const openLink = (address: string) => {
  window.open(address, '__blank');
};

const InfoItem = ({ data, isLast }: { data: InfoItemProps; isLast?: boolean }) => {
  const { addr, value, script, index } = data;
  const [, copyToClipboard] = useCopyToClipboard();

  return (
    <Stack direction="row" sx={{ padding: '10px 0', borderBottom: isLast ? '0' : border, fontSize: 12 }}>
      <Box sx={{ color: '#000', fontWeight: 600 }}>{index}.</Box>
      <Stack sx={{ marginLeft: '10px' }}>
        {addr && (
          <Stack direction="row" spacing="5px">
            <Box
              sx={{ color: 'rgb(255, 161, 51)', ...buttonHover }}
              onClick={(e) => {
                e.stopPropagation();
                openLink(`${config.addrUrl}/${addr}`);
              }}>
              {formatAddress(addr, 9)}{' '}
            </Box>
            <Box
              sx={{ ...buttonHover }}
              onClick={() => {
                copyToClipboard(addr);
                toast('Copy succeeded');
              }}>
              📋
            </Box>
          </Stack>
        )}
        <Box>{value ? fromTokenDecimals(value)?.toString() : '0'} BTC</Box>
        {script && (
          <Box
            onClick={() => {
              toast('TODO');
            }}
            sx={{ color: 'rgb(255, 161, 51)' }}>
            Scripts
          </Box>
        )}
      </Stack>
    </Stack>
  );
};

function TxItem({ data }: TxItemProps) {
  const { index, hash, out, fee } = data;

  const [collapse, setCollapse] = useState(true);

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const btcAmount = accumulate(out, 'value');

  const renderInputItem = () => {
    return (data?.inputs || []).map((item, index) => {
      if (!item.prev_out.addr && !item.prev_out.script && !item.prev_out.value)
        return (
          <Box key={index} sx={{ padding: '10px 0', fontSize: '12px' }}>
            CoinBase
          </Box>
        );
      return (
        <InfoItem
          key={index}
          data={{ ...item.prev_out, index: index + 1 }}
          isLast={index === data?.inputs?.length - 1}
        />
      );
    });
  };
  const renderOutPutItem = () => {
    return (data?.out || []).map((item, index) => {
      if (!item.addr && !item.script && !item.value) return <></>;
      return <InfoItem key={index} data={{ ...item, index: index + 1 }} isLast={index === data?.out?.length - 1} />;
    });
  };

  return (
    <Box
      sx={{
        flexShrink: 0,
        height: !collapse ? 'inherit' : '53px',
        transition: 'height 0.5s',
        border: '1px solid rgb(238, 238, 238)',
        borderRadius: '10px',
        overflow: 'hidden',
      }}>
      <Stack
        onClick={handleCollapse}
        direction="row"
        justifyContent="space-between"
        sx={{
          position: 'relative',
          padding: '10px 60px 10px 10px',
          fontSize: 12,
          ...buttonHover,
        }}>
        {/* left */}
        <Stack direction="column">
          <Stack direction="row" alignItems="center" spacing="3px">
            <Box sx={{ color: '#000' }}>TX {index}</Box>
            <Box>•</Box>
            <Box>Hash</Box>
            <Box
              sx={{ color: 'rgb(255, 161, 51)' }}
              onClick={(e) => {
                e.stopPropagation();
                openLink(`${config.txUrl}/${hash}`);
              }}>
              {formatAddress(hash, 4)}
            </Box>
          </Stack>
          <Box sx={{ color: 'rgb(153, 153, 153)' }}>{Dayjs(data?.time * 1000).format('YYYY-MM-DD HH:mm:ss')}</Box>
        </Stack>
        {/* right */}
        <Stack direction="column">
          <Stack direction="row" spacing="3px">
            <Box sx={{ color: '#000', fontWeight: '600' }}>{fromTokenDecimals(btcAmount)?.toString()} BTC</Box>
            <Box sx={{ color: 'rgb(153, 153, 153)' }}>$ --</Box>
          </Stack>
          <Stack direction="row" spacing="3px">
            <Box sx={{ color: 'rgb(249, 62, 62)' }}>Fee</Box>
            <Box>
              {numbro(fee).format({
                average: true,
                mantissa: 2,
              })}
            </Box>
            <Box>Sats</Box>
            <Box sx={{ color: 'rgb(153, 153, 153)' }}>$ --</Box>
          </Stack>
        </Stack>

        {/* arrow */}
        <Box
          sx={{
            position: 'absolute',
            right: '10px',
            top: 'calc(50% - 14px)',
          }}>
          <KeyboardArrowDownIcon
            sx={{
              color: 'rgb(153, 153, 153)',
              transform: collapse ? `rotate(0)` : `rotate(-180deg)`,
              transition: `transform 0.5s`,
            }}
          />
        </Box>
      </Stack>
      {/* details */}
      <Stack direction="row" sx={{ height: 'inherit', borderTop: border }}>
        {/* from */}
        <Stack sx={{ flex: 1, borderRight: border }}>
          <Box sx={{ fontSize: 14, padding: '10px', fontWeight: 900, borderBottom: border }}>From</Box>
          <Box sx={{ padding: '0 10px' }}>{renderInputItem()}</Box>
        </Stack>
        {/* to */}
        <Stack sx={{ flex: 1 }}>
          <Box sx={{ fontSize: 14, padding: '10px', fontWeight: 900, borderBottom: border }}>To</Box>
          <Stack sx={{ padding: '0 10px' }}>{renderOutPutItem()}</Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default React.memo(TxItem);
